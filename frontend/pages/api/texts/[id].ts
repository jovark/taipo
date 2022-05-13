import { NextApiResponse } from 'next';
import { languages } from '../../../words';

export default function handler(
    { query: { id } }: any,
    res: NextApiResponse
): void {
    const filtered = languages.filter((language) => language.id === id);

    if (filtered.length > 0) {
        res.status(200).json(filtered[0]);
    } else {
        res.status(404).json({
            message: `language with the id: ${id} is not found`,
        });
    }
}
