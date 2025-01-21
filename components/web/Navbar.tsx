import {
  RegisterLink,
  LogoutLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "../ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Navbar() {
  const { getUser, getOrganization, getUserOrganizations } =
    getKindeServerSession();
  const user = await getUser();
  const organization = await getOrganization();
  const userOrganizations = await getUserOrganizations();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Multi-Tenant App</h1>
      {user ? (
        <div className="flex items-center gap-2">
          <p>Welcome, your are in {organization?.orgName}</p>
          <div>
            {userOrganizations.orgs.map((item) => (
              <LoginLink key={item.code} orgCode={item.code}>
                {item.name}
              </LoginLink>
            ))}
          </div>
          <LogoutLink className={buttonVariants()}>Logout</LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <RegisterLink className={buttonVariants()}>Register</RegisterLink>
          <LoginLink className={buttonVariants()}>Login</LoginLink>
        </div>
      )}
    </div>
  );
}
