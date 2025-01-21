/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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
    return <div>No organization found</div>;
  }

  const articles = await getArticles(organization?.orgCode);
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Home Page - Tenants should only see their own articles
      </h1>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {articles.map((article) => (
          <Card key={article.id}>
            <img
              src={article.imageUrl as string}
              alt={article.title}
              className="rounded-t-md h-48 object-contain"
            />
            <CardContent>
              <h1 className="text-2xl font-bold mt-2">{article.title}</h1>
              <p className="text-sm text-gray-500 mt-2 line-clamp-5">
                {article.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
