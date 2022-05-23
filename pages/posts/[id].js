// Add this import at the top of the file
import utilStyles from '../../styles/utils.module.css';
import {getAllPostIds, getPostData} from "../../lib/posts";
import Date from "../../components/Date";
import Head from "next/head";
import Layout from "../../components/Layout";

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    return {
        props: {postData : await getPostData(params.id)}
    };
}