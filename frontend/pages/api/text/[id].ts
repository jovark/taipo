import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../utils/mongo';
import Language from '../../../models/languageModel';

const getLanguage = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('connecting to MongoDB');
    await connectMongo();

    const language = await Language.findById(req.body.id);

    res.status(200).json(language);
};
