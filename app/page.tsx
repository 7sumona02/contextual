/* eslint-disable @next/next/no-img-element */
import React from "react";
import { prisma } from "@/lib/db";
import { getKindeServerSession, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Twitter } from "lucide-react";

async function getArticles(orgId: string) {
  const articles = await prisma.article.findMany({
    where: {
      tenantId: orgId,
    },
  });
  return articles;
}

const HomePage = async () => {
  const { getOrganization } = getKindeServerSession();

  const organization = await getOrganization();

  if (!organization?.orgCode) {
    return <div className="h-screen w-full p-10 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold tracking-tighter max-w-4xl mx-auto">
        Read in Context.
      </h1>
      <p className="font-medium pt-2 md:max-w-lg text-center leading-tight text-neutral-800">Contextual brings together blogs from multiple organisations in one seamless platform — tailored to your chosen space.</p>
      <div className="pt-6 space-x-3">
        <Button className="py-5"><LoginLink>Start reading smarter →</LoginLink> </Button>
        <Link href='/learn-more'><Button className="py-5 bg-white shadow-none border border-black text-black hover:bg-white">Learn more</Button></Link>
      </div>
      {/* <div className="grid grid-cols-3 gap-4 mt-5">
        {articles.map((article) => (
          <Card key={article.id}>
            <img
              src={article.imageUrl as string}
              alt={article.title}
              className="rounded-t-md object-cover"
            />
            <CardContent>
              <h1 className="text-2xl font-bold mt-2">{article.title}</h1>
              <p className="text-sm text-gray-500 mt-2 line-clamp-5">
                {article.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div> */}
    </div>;
  }

  const articles = await getArticles(organization?.orgCode);
  return (
    <div className="h-screen w-full p-10 flex flex-col items-center justify-center relative">
      <h1 className="text-3xl font-semibold tracking-tighter md:max-w-4xl mx-auto">
        Read in Context.
      </h1>
      <p className="font-medium pt-2 md:max-w-lg text-center leading-tight text-neutral-800">Contextual brings together blogs from multiple organisations in one seamless platform — tailored to your chosen space.</p>
      <div className="pt-6 space-x-3 flex">
        <Button className="py-5"><LoginLink>Start reading smarter →</LoginLink> </Button>
        <Link href='/learn-more'><Button className="py-5 bg-white shadow-none border border-black text-black hover:bg-white">Learn more</Button></Link>
      </div>
      {/* <div className="grid grid-cols-3 gap-4 mt-5">
        {articles.map((article) => (
          <Card key={article.id}>
            <img
              src={article.imageUrl as string}
              alt={article.title}
              className="rounded-t-md object-cover"
            />
            <CardContent>
              <h1 className="text-2xl font-bold mt-2">{article.title}</h1>
              <p className="text-sm text-gray-500 mt-2 line-clamp-5">
                {article.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div> */}
      
    </div>
  );
};

export default HomePage;
