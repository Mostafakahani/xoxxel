//

import axios from "axios";

// config api site and panels
export const serverName = "arsham-teb-mht.iran.liara.run";
export const baseApi = `https://${serverName}/api/v1`;
export const Server = `https://${serverName}/`;

//
// data status list selects site and panel
export const dataStatusBlog = [
  {
    value: "on",
    label: "تایید شده",
    color: "success",
  },
  {
    value: "waiting",
    label: "در انتظار تایید",
    color: "warning",
  },
  {
    value: "off",
    label: "رد شده",
    color: "error",
  },
];

export const dataStatusUser = [
  {
    value: "on",
    label: "تایید شده",
    color: "success",
  },
  {
    value: "waiting",
    label: "در انتظار تایید",
    color: "warning",
  },
  {
    value: "off",
    label: "رد شده",
    color: "error",
    message: true,
  },
];

export const dataCategoryLearns = [
  {
    text: "همه",
    value: "ALL",
  },
  {
    text: "آزمایشگاهی",
    value: "axma",
  },
  {
    text: "پزشکی",
    value: "doctors",
  },
  {
    text: "دندان پزشکی",
    value: "dentins",
  },
  {
    text: "زیبایی",
    value: "zibaii",
  },
];

export const dataSocials = [
  {
    icon: (
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.4993 16.6667C14.1813 16.6667 17.166 13.682 17.166 10.0001C17.166 6.31818 14.1813 3.33341 10.4993 3.33341C6.81745 3.33341 3.83268 6.31818 3.83268 10.0001C3.83268 13.682 6.81745 16.6667 10.4993 16.6667ZM10.4993 18.3334C15.1017 18.3334 18.8327 14.6024 18.8327 10.0001C18.8327 5.39771 15.1017 1.66675 10.4993 1.66675C5.89697 1.66675 2.16602 5.39771 2.16602 10.0001C2.16602 14.6024 5.89697 18.3334 10.4993 18.3334Z"
          fill="#777E91"
        />
        <path
          d="M10.4993 8.33325C10.4993 7.87302 10.8724 7.49992 11.3327 7.49992H12.166C12.6263 7.49992 12.9993 7.12683 12.9993 6.66659C12.9993 6.20635 12.6263 5.83325 12.166 5.83325H11.3327C9.95193 5.83325 8.83268 6.95254 8.83268 8.33325V9.99992H7.99935C7.53912 9.99992 7.16602 10.373 7.16602 10.8333C7.16602 11.2935 7.53911 11.6666 7.99935 11.6666H8.83268V16.6666C8.83268 17.1268 9.20577 17.4999 9.66602 17.4999C10.1263 17.4999 10.4993 17.1268 10.4993 16.6666V11.6666H12.166C12.6263 11.6666 12.9993 11.2935 12.9993 10.8333C12.9993 10.373 12.6263 9.99992 12.166 9.99992H10.4993V8.33325Z"
          fill="#777E91"
        />
      </svg>
    ),
    href: "#",
  },
  {
    icon: (
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.15115 11.6665C1.77305 11.6704 0.883457 13.2403 1.73245 14.4298C2.9483 16.133 5.1531 17.5 8.83395 17.5C14.5382 17.5 19.117 12.8514 18.476 7.35925L19.4151 5.48108C20.0664 4.17857 18.9347 2.69685 17.5067 2.98245L16.266 3.23057C15.9371 3.05702 15.5967 2.92606 15.3058 2.83117C14.7388 2.64627 14.0525 2.5 13.4173 2.5C12.2762 2.5 11.2914 2.79276 10.5087 3.37994C9.73495 3.96053 9.29911 4.72354 9.05995 5.42421C8.9497 5.74717 8.87628 6.07112 8.82917 6.38203C8.38645 6.24269 7.93502 6.05522 7.49307 5.82629C6.49041 5.30693 5.67961 4.64852 5.22224 4.07126C4.45488 3.10275 2.82868 3.17456 2.25803 4.43351C1.45375 6.20789 1.67437 8.31122 2.39732 10.0108C2.63964 10.5803 2.95485 11.1434 3.33994 11.6652C3.27401 11.666 3.21095 11.6663 3.15115 11.6665ZM8.83386 15.8333C5.61441 15.8333 3.94969 14.6672 3.0889 13.4614C3.05022 13.4072 3.08922 13.3333 3.15578 13.3332C4.03148 13.3307 5.82898 13.2892 7.01448 12.5954C7.07579 12.5595 7.0623 12.4691 6.99496 12.4465C4.23149 11.5173 2.66063 7.58216 3.77595 5.12158C3.80152 5.06517 3.87735 5.05772 3.91583 5.10628C5.18989 6.71432 7.97555 8.28933 10.3992 8.33242C10.4518 8.33333 10.4915 8.28558 10.4835 8.23361C10.3859 7.60044 10.0129 4.16667 13.4172 4.16667C14.2301 4.16667 15.4396 4.56319 15.8851 4.96942C15.9057 4.98819 15.9336 4.99672 15.9609 4.99125L17.8334 4.61675C17.9014 4.60315 17.9554 4.67371 17.9244 4.73573L16.7629 7.05849C16.7549 7.07462 16.7524 7.09312 16.7554 7.11088C17.5689 11.6833 13.8239 15.8333 8.83386 15.8333Z"
          fill="#777E91"
        />
      </svg>
    ),
    href: "#",
  },
  {
    icon: (
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.8327 3.33341H7.16602C5.32507 3.33341 3.83268 4.8258 3.83268 6.66675V13.3334C3.83268 15.1743 5.32507 16.6667 7.16602 16.6667H13.8327C15.6736 16.6667 17.166 15.1743 17.166 13.3334V6.66675C17.166 4.8258 15.6736 3.33341 13.8327 3.33341ZM7.16602 1.66675C4.40459 1.66675 2.16602 3.90532 2.16602 6.66675V13.3334C2.16602 16.0948 4.40459 18.3334 7.16602 18.3334H13.8327C16.5941 18.3334 18.8327 16.0948 18.8327 13.3334V6.66675C18.8327 3.90532 16.5941 1.66675 13.8327 1.66675H7.16602Z"
          fill="#777E91"
        />
        <path
          d="M14.6673 6.66667C15.1276 6.66667 15.5007 6.29357 15.5007 5.83333C15.5007 5.3731 15.1276 5 14.6673 5C14.2071 5 13.834 5.3731 13.834 5.83333C13.834 6.29357 14.2071 6.66667 14.6673 6.66667Z"
          fill="#777E91"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.6673 9.99992C14.6673 12.3011 12.8018 14.1666 10.5007 14.1666C8.19947 14.1666 6.33398 12.3011 6.33398 9.99992C6.33398 7.69874 8.19947 5.83325 10.5007 5.83325C12.8018 5.83325 14.6673 7.69874 14.6673 9.99992ZM13.0007 9.99992C13.0007 11.3807 11.8814 12.4999 10.5007 12.4999C9.1199 12.4999 8.00065 11.3807 8.00065 9.99992C8.00065 8.61917 9.1199 7.49992 10.5007 7.49992C11.8814 7.49992 13.0007 8.61917 13.0007 9.99992Z"
          fill="#777E91"
        />
      </svg>
    ),
    href: "#",
  },
  {
    icon: (
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.4993 16.6667C14.1813 16.6667 17.166 13.682 17.166 10.0001C17.166 6.31818 14.1813 3.33341 10.4993 3.33341C6.81745 3.33341 3.83268 6.31818 3.83268 10.0001C3.83268 13.682 6.81745 16.6667 10.4993 16.6667ZM10.4993 18.3334C15.1017 18.3334 18.8327 14.6024 18.8327 10.0001C18.8327 5.39771 15.1017 1.66675 10.4993 1.66675C5.89697 1.66675 2.16602 5.39771 2.16602 10.0001C2.16602 14.6024 5.89697 18.3334 10.4993 18.3334Z"
          fill="#777E91"
        />
        <path
          d="M13.3945 17.8167C13.0986 15.7082 12.6056 13.7946 11.9117 11.9858C10.2131 12.8093 8.31327 14.2482 5.70097 16.8141C5.24392 16.4916 4.82076 16.1244 4.43788 15.7187C7.18152 13.013 9.27702 11.3954 11.2628 10.4486C11.008 9.89637 10.7333 9.35196 10.4385 8.81254C8.10062 9.54937 5.43492 9.93762 2.16602 9.99312C2.16647 9.42112 2.22458 8.86254 2.33483 8.32293C5.21977 8.26112 7.55353 7.92722 9.57343 7.33376C8.63587 5.82934 7.53698 4.34437 6.2741 2.81576C6.76652 2.52552 7.2914 2.28447 7.84197 2.09937C9.11635 3.66567 10.2329 5.2051 11.1891 6.77942C12.9855 6.06937 14.5778 5.11107 16.1672 3.89098C16.5758 4.27018 16.9462 4.68987 17.2721 5.14364C15.6189 6.42239 13.9331 7.45881 12.0237 8.24011C12.3047 8.76487 12.5683 9.29546 12.8145 9.83396C14.7034 9.23554 16.5626 9.17371 18.7916 9.16737C18.8188 9.44121 18.8327 9.71904 18.8327 10C18.8327 10.2816 18.8187 10.56 18.7914 10.8344C16.6378 10.842 15.0407 10.9027 13.4634 11.3775C14.1407 13.1405 14.6417 15.0042 14.9633 17.0381C14.4728 17.3499 13.9475 17.6118 13.3945 17.8167Z"
          fill="#777E91"
        />
      </svg>
    ),
    href: "#",
  },
  {
    icon: (
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_25_938)">
          <path
            d="M14.6673 3.33325C14.2071 3.33325 13.834 3.70635 13.834 4.16659C13.834 4.62682 14.2071 4.99992 14.6673 4.99992H18.0007C18.4609 4.99992 18.834 4.62682 18.834 4.16659C18.834 3.70635 18.4609 3.33325 18.0007 3.33325H14.6673Z"
            fill="#777E91"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.166 10.8334C12.166 8.53225 14.0315 6.66675 16.3327 6.66675C18.6338 6.66675 20.4993 8.53225 20.4993 10.8334V11.6667C20.4993 12.127 20.1263 12.5001 19.666 12.5001H13.8327C13.8327 13.8808 14.9519 15.0001 16.3327 15.0001C16.9139 15.0001 17.4488 14.8017 17.8733 14.4691C18.0951 14.2952 18.3571 14.1667 18.6389 14.1667C19.353 14.1667 19.8099 14.9043 19.3103 15.4147C18.554 16.1872 17.4993 16.6667 16.3327 16.6667C14.0315 16.6667 12.166 14.8012 12.166 12.5001V10.8334ZM16.3327 8.33341C14.9519 8.33341 13.8327 9.45266 13.8327 10.8334H18.8327C18.8327 9.45266 17.7134 8.33341 16.3327 8.33341Z"
            fill="#777E91"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.16667 4.99992V8.33325H6.33333C7.25381 8.33325 8 7.58706 8 6.66659C8 5.74611 7.25381 4.99992 6.33333 4.99992H2.16667ZM8.66648 9.04725C9.28375 8.44225 9.66667 7.59914 9.66667 6.66659C9.66667 4.82564 8.17428 3.33325 6.33333 3.33325H1.83333C1.09695 3.33325 0.5 3.93021 0.5 4.66659V15.238C0.5 16.027 1.13959 16.6666 1.92858 16.6666H6.33333C8.63452 16.6666 10.5 14.8011 10.5 12.4999C10.5 11.0632 9.77283 9.79634 8.66648 9.04725ZM2.16667 9.99992V14.9999H6.33333C7.71404 14.9999 8.83333 13.8807 8.83333 12.4999C8.83333 11.1192 7.71404 9.99992 6.33333 9.99992H2.16667Z"
            fill="#777E91"
          />
        </g>
        <defs>
          <clipPath id="clip0_25_938">
            <rect
              width="20"
              height="20"
              fill="white"
              transform="translate(0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    href: "#",
  },
];

export const http = async (method, url) => await axios[method](baseApi + url);
