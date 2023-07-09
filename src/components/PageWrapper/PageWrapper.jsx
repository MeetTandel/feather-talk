import { useState } from "react";
import {
  SideNavigation,
  FollowSuggestions,
  GenericModal,
  CreateNewPost,
  BottomNavigation,
  SideNavDrawer,
} from "../index";
import { GiHamburgerMenu as HamburgerIcon } from "react-icons/gi";
import { GrClose as CloseIcon } from "react-icons/gr";

export function PageWrapper({ children }) {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);

  const handleSideNavClose = (e) => {
    if (!showSideNav) return;

    const clickedOn = e.target.dataset.nav;
    const clickedOnUserCard = e.target.closest("#user-card")?.dataset?.nav;

    if (clickedOn !== "side-nav" && clickedOnUserCard !== "user-card") {
      setShowSideNav(false);
    }
  };

  return (
    <div
      onClick={(e) => handleSideNavClose(e)}
      className="flex flex-row justify-around h-screen bg-gray-200   gap-4 p-4 md:px-4 lg:px-16 w-screen grow relative overflow-y-auto [&::-webkit-scrollbar]:hidden"
    >
      <aside className="mb-4 w-[15%] lg:w-[20%] h-[98%] sticky top-0 hidden md:block overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <SideNavigation setShowPostModal={setShowPostModal} />
      </aside>

      <main className="flex flex-col w-[100%] lg:w-[50%] h-max mb-[4rem]">
        <div
          onClick={() => setShowSideNav(!showSideNav)}
          className="cursor-pointer self-end w-max p-2 mb-4 rounded-lg bg-white hover:bg-slate-100 shadow-md md:hidden z-10"
        >
          {!showSideNav ? <HamburgerIcon size={24} /> : <CloseIcon size={24} />}
        </div>
        {children}
        <BottomNavigation />
      </main>

      <aside className="bg-white mb-4 w-[25%] max-h-[98%] h-max sticky top-0 hidden lg:block rounded-lg overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <FollowSuggestions />
      </aside>

      {showPostModal && (
        <GenericModal setShowModal={setShowPostModal}>
          <CreateNewPost />
        </GenericModal>
      )}

      <SideNavDrawer
        setShowPostModal={setShowPostModal}
        showSideNav={showSideNav}
      />
    </div>
  );
}
