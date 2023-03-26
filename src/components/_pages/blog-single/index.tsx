import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/common/container/container";
import Layout from "@/components/common/layout/layout";

import type { BlogPostListItem } from "@/lib/types/api";

type BlogSinglePageProps = {
  post: BlogPostListItem;
};

const BlogSinglePage = (props: BlogSinglePageProps) => {
  return (
    <Layout>
      <div className="w-full py-12 bg-black">
        <Container>
          <h2 className="text-3xl font-bold tracking-wide text-center text-white">Blog</h2>
        </Container>
      </div>
      <main>
        <Container className="w-full py-8">
          <div className="mx-auto w-full max-w-3xl">
            <h2
              className="font-bold text-4xl"
              dangerouslySetInnerHTML={{ __html: props.post.title.rendered }}
            ></h2>
            <article className="w-full blog-content trackin">
              <Image
                width={1024}
                height={1024}
                src={
                  props.post._embedded["wp:featuredmedia"]?.[0].media_details.sizes.large.source_url
                }
                alt={props.post._embedded["wp:featuredmedia"]?.[0].alt_text}
                className="w-full my-6 h-auto"
              />
              <div dangerouslySetInnerHTML={{ __html: props.post.content.rendered }}></div>
            </article>
            <div className="w-full border-t border-solid border-gray-300 pt-3 text-sm">
              {props.post._embedded["wp:term"][0]?.length > 0 ? (
                <div>
                  Categories:{" "}
                  {props.post._embedded["wp:term"][0]?.map((category, i, arr) => (
                    <Fragment key={category.slug}>
                      <Link
                        className="font-medium underline"
                        href={`/blog/category/${category.slug}`}
                      >
                        {category.name}
                      </Link>
                      {i !== arr.length - 1 ? ", " : ""}
                    </Fragment>
                  ))}
                </div>
              ) : null}
              {props.post._embedded["wp:term"][1]?.length ? (
                <div>
                  Tags:{" "}
                  {props.post._embedded["wp:term"][1]?.map((tag, i, arr) => (
                    <Fragment key={tag.slug}>
                      <Link className="font-medium underline" href={`/blog/tag/${tag.slug}`}>
                        {tag.name}
                      </Link>
                      {i !== arr.length - 1 ? ", " : ""}
                    </Fragment>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export default BlogSinglePage;
