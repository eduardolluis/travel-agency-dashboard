import { OAuthProvider, Query } from 'appwrite';
import { account, appwriteConfig, database } from './client';
import { redirect } from 'react-router';
import axios from 'axios';

export const loginWithGoogle = async () => {
  try {
    account.createOAuth2Session(OAuthProvider.Google);
  } catch (e) {
    console.log('loginWithGoogle', e);
  }
};

export const getUser = async () => {
  try {
    const user = await account.get();

    if (!user) return redirect('/login');

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userscollectionId,
      [
        Query.equal('accountId', user.$id),
        Query.select(['name', 'email', 'imageUrl', 'accountId', 'joinedAt']),
      ]
    );
  } catch (e) {
    console.log(e);
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
    redirect('/login');
  } catch (e) {
    console.log(e);
  }
};

export const getGooglePicture = async (
  accessToken: string
): Promise<string | null> => {
  try {
    const response = await axios.get(
      'https://people.googleapis.com/v1/people/me?personFields=photos',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const photos = response.data.photos;
    if (photos && photos.length > 0) {
      return photos[0].url;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const storeUserData = async () => {
  try {
    const user = await account.get();

    if (!user) return null;

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userscollectionId,
      [Query.equal('accountId', user.$id)]
    );

    if (documents.length > 0) return documents[0];

    const imageUrl = await getGooglePicture(user.prefs.googleAccessToken);

    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userscollectionId,
      'unique()',
      {
        accountId: user.$id,
        name: user.name,
        email: user.email,
        imageUrl: imageUrl || '',
        joinedAt: new Date().toISOString(),
      }
    );
    return newUser;
  } catch (e) {
    console.log(e);
  }
};

export const getExistingUser = async () => {
  try {
    const user = await account.get();
    if (!user) return null;

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userscollectionId,
      [Query.equal('accountId', user.$id)]  
    );

    if (documents.length > 0) {
      return documents[0];
    }

    return null;
  } catch (e) {
    console.log(e); 
    return null;
  }
};
