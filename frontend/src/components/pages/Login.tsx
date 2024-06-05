
import { Outlet } from "react-router-dom";

export function Login() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div className="hidden bg-muted lg:block">
      <img
        src="https://i.postimg.cc/grF92kYj/bg1.png"
        alt="Image"

        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
    <Outlet />
  </div>
  );
}
