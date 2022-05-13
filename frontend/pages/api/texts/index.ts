import { NextApiRequest, NextApiResponse } from 'next';
import { languages } from '../../../words';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(languages);
}
