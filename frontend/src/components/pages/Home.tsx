import { useEffect, useState } from "react";
import { InputWithButton } from "../Layouts/AddNoteButton";
import { Links } from "../Layouts/Links";
import { ModeToggle } from "../theme/theme";
import { getUrls } from "@/services/user/apiMethods";
import { useSelector } from "react-redux";
import { LogoutModal } from "../Layouts/LogoutModal";

function Home() {
  const [links, setLinks] = useState([]);
  const selectUser = (state: any) => state.auth.user;
  const userData = useSelector(selectUser);
  const userId = userData._id || "";

  useEffect(() => {
    getUrls(userId).then((response: any) => {
      setLinks(response.data);
    });
  }, []);

  return (
 <div
      className="w-full h-full bg-cover bg-center dark:bg-gray-900"
  
    >
      <div  className="bg-cover bg-center "    style={{
        backgroundImage: "url('https://i.postimg.cc/Hn7Dm71F/033937566c8ae0c431d1ea7751703a59.jpg')",
      }}>
              <div className="flex justify-end gap-4 p-5">
        <ModeToggle />
        <LogoutModal />
      </div>
      <div className="flex flex-col items-center mt-5 pb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 my-5">
          URL Shortener
        </h1>
        <p className="text-gray-600 dark:text-gray-400 my-4">
          Paste your URL below to shorten it
        </p>
        <InputWithButton setLinks={setLinks} />
      </div>

      </div>

      <div className="flex gap-5 flex-wrap justify-center mt-14">
        {links.map((link) => (
          <Links link={link} setLinks={setLinks} />
        ))}
      </div>
    </div>
  );
}

export default Home;
