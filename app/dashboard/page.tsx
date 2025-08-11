import React from 'react'
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Card, CardContent } from '@/components/ui/card';

async function getArticles(orgId: string) {
  const articles = await prisma.article.findMany({
    where: {
      tenantId: orgId,
    },
  });
  return articles;
}

const page = async () => {
    const { getOrganization } = getKindeServerSession();

  const organization = await getOrganization();

  if (!organization?.orgCode) {
    return <div className="max-w-4xl mx-auto flex justify-center pt-20 text-neutral-800">No organization found</div>;
  }

  const articles = await getArticles(organization?.orgCode);
  return (
    <div className="h-screen container max-w-5xl mx-auto md:p-10 mt-20 p-6">
      <div className="flex flex-col gap-10 mt-5">
        {articles.map((article) => (
          <div className='w-full pb-8 border-b border-b-neutral-300 cursor-pointer group' key={article.id}>
            <div className='flex justify-between'>
                <div className='font-semibold text-lg tracking-tight leading-tight group-hover:underline transition-all'>{article.title}</div>
                <div className='text-neutral-600'>{article.createdAt.toLocaleDateString()}</div>
            </div>
            <div className='text-neutral-600 max-w-md pt-4'>{article.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page