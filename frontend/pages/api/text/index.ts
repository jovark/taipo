import { NextApiResponse } from 'next';
import Language from '../../../models/languageModel';
import connectMongo from '../../../utils/mongo';

export default async function handler(res: NextApiResponse) {
    await connectMongo();

    const languages = await Language.find();

    res.status(200).json(languages);
}
