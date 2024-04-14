import { FooterLogo } from "./Logo";

import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <footer className="p-5 bg-[#F7F7F7] mt-20 flex justify-evenly max-sm:px-0">
      <div className="max-sm:hidden">
        <FooterLogo />
      </div>

      <div className="flex flex-col gap-3 cursor-pointer text-md max-sm:text-xs">
        <div>
          <ul className="flex justify-between max-sm:justify-start max-sm:gap-2">
            <li className="hover:underline">About Us</li>
            <li className="hover:underline">Careers</li>
            <li className="hover:underline">FAQs</li>
            <li className="hover:underline">Support</li>
            <li className="hover:underline">Collection</li>
          </ul>
        </div>

        <div className="flex text-sm justify-between  max-sm:text-xs">
          <ul className="flex gap-2 text-stone-400 max-sm:justify-center">
            <li>&copy; {new Date().getFullYear()} Cleartrip Pvt. Ltd.</li>
            <li className="max-sm:hidden"> Privacy</li>
            <li className="max-sm:hidden"> Security</li>
            <li className="max-sm:hidden"> Terms of Use</li>
          </ul>

          <div className="ml-7 flex items-center gap-3 text-stone-500 max-sm:flex-wrap ">
            <span className=" text-stone-400">Connect</span>
            <a href="https://www.facebook.com/cleartrip">
              <FaFacebook size={15} />
            </a>
            <a href="https://www.instagram.com/cleartrip/">
              <AiFillInstagram size={15} />
            </a>
            <a href="https://twitter.com/cleartrip">
              <AiFillTwitterCircle size={15} />
            </a>
            <a
              href="https://www.linkedin.com/company/cleartrip/?original_referer="
              className="border rounded-xl"
            >
              <BsLinkedin size={15} className="rounded-lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
