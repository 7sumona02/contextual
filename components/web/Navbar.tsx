import {
  RegisterLink,
  LogoutLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button, buttonVariants } from "../ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

export async function Navbar() {
  const { getUser, getOrganization, getUserOrganizations } =
    getKindeServerSession();
  const user = await getUser();
  const organization = await getOrganization();
  const userOrganizations = await getUserOrganizations();

  return (
    <div className="fixed top-0 w-screen">
      <div className="flex justify-between items-center p-4 max-w-4xl mx-auto">
      <Link href='/' className="cursor-pointer"><h1 className="text-2xl font-medium tracking-tighter">contextual</h1></Link>
      {user ? (
        <div className="flex items-center gap-8">
          <p className="text-sm text-neutral-800 md:block hidden">Welcome, you are in {organization?.orgName}!</p>
          {/* <div className="flex gap-6">
            {userOrganizations?.orgs?.map((item) => (
              <LoginLink key={item.code} orgCode={item.code} className="text-sm text-neutral-800">
                {item.name}
              </LoginLink>
            ))}
          </div> */}
          <div className="flex gap-2">
            <Button className="bg-white shadow-none border border-black text-black hover:bg-white"><LogoutLink>Logout</LogoutLink></Button>
            {/* <Button>Organization</Button> */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>Organization</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="shadow-lg border-none p-2 space-y-1">
                {userOrganizations?.orgs?.map((item) => (
                  <DropdownMenuItem key={item.code}>
                    <LoginLink key={item.code} orgCode={item.code} className="text-sm text-neutral-800">
                      {item.name}
                    </LoginLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button className="bg-white shadow-none border border-black text-black hover:bg-white"><LoginLink>Login</LoginLink></Button>
          <RegisterLink className={buttonVariants()}>Register</RegisterLink>
        </div>
      )}
    </div>
    </div>
  );
}
