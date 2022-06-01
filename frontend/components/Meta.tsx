import Head from 'next/head';
import { PropsWithRef } from 'react';

const Meta = ({
    title,
    keywords,
    description,
}: PropsWithRef<{ title: string; keywords: string; description: string }>) => {
    return (
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='keywords' content={keywords} />
            <meta name='description' content={description} />
            <meta charSet='utf-8' />
            <link rel='icon' href='/favicon.ico' />
            <title>{title}</title>
        </Head>
    );
};

Meta.defaultProps = {
    title: 'taipo',
    keywords: 'taipo, typing test, wpm',
    description: 'Find out how fast you type',
};

export default Meta;
