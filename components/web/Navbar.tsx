import { Button } from "../ui/button";

export function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Multi-Tenant App</h1>
      <div className="flex items-center gap-2">
        <Button>Login</Button>
        <Button variant="outline">Logout</Button>
      </div>
    </div>
  );
}
