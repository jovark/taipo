import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../utils/mongo';
import Language from '../../../models/languageModel';

const getLanguage = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('Connecting to MongoDB');
    await connectMongo();

    const language = await Language.findById(req.query.id);

    res.status(200).json(language);
};

export default getLanguage;
