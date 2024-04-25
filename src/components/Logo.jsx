import { Link } from "react-router-dom";

const logoStyles = {
  cursor: "pointer",
};

function Logo() {
  return (
    <Link to="/">
      <div style={logoStyles}>
        <svg width="107" height="24" viewBox="0 0 310 65" fill="none">
          <path
            d="M249.469 16.3906C243.189 16.3906 240.039 19.1706 240.039 25.4606V49.1506H247.469V25.8206C247.469 23.7506 248.399 22.7506 250.539 22.7506H257.039V16.3906H249.469V16.3906Z"
            fill="#FF4F17"
          ></path>
          <path
            d="M264.891 1.59961C262.461 1.59961 260.461 3.59961 260.461 6.09961C260.461 8.59961 262.461 10.5296 264.891 10.5296C267.321 10.5296 269.391 8.52961 269.391 6.09961C269.391 3.66961 267.391 1.59961 264.891 1.59961Z"
            fill="#FF4F17"
          ></path>
          <path
            d="M268.61 16.2402H261.25V49.0902H268.61V16.2402Z"
            fill="#FF4F17"
          ></path>
          <path
            d="M121.289 42.8804C119.149 42.8804 118.219 42.3104 118.219 40.1704V1.65039H110.789V40.1704C110.789 46.6704 114.429 49.2404 120.139 49.2404H124.069V42.8804H121.289V42.8804Z"
            fill="#FF4F17"
          ></path>
          <path
            d="M209.119 16.2695C202.839 16.2695 199.689 19.0495 199.689 25.3395V49.1195H207.119V25.6995C207.119 23.6295 208.049 22.6295 210.189 22.6295H216.689V16.2695H209.119Z"
            fill="#FF4F17"
          ></path>
          <path
            d="M228.33 16.2998V8.08984H220.9V40.0798C220.9 46.2898 224.11 49.1498 230.33 49.1498H235.9V42.7898H231.4C229.4 42.7898 228.33 42.0798 228.33 40.0798V22.6598H235.9V16.2998H228.33V16.2998Z"
            fill="#FF4F17"
          ></path>
          <path
            d="M274.82 16.5006V63.3706H282.25V46.3006C284.91 48.1406 288.13 49.2306 291.6 49.2306C300.67 49.2306 308.02 41.8806 308.02 32.8106C308.02 23.7406 300.67 16.3906 291.6 16.3906C288.12 16.3906 284.9 17.4806 282.25 19.3206V16.5006H274.82V16.5006ZM282.25 32.8106C282.25 27.6406 286.44 23.4606 291.6 23.4606C296.76 23.4606 300.95 27.6506 300.95 32.8106C300.95 37.9706 296.76 42.1606 291.6 42.1606C286.44 42.1606 282.25 37.9706 282.25 32.8106V32.8106Z"
            fill="#FF4F17"
          ></path>
          <path
            d="M156.92 32.1006C156.92 22.1006 150.21 16.3906 141.42 16.3906C131.57 16.3906 125.5 23.2506 125.5 32.7406C125.5 42.2306 132.21 49.2406 141.57 49.2406C149.85 49.2406 154.21 45.5306 156.28 39.3906H148.28C147.07 41.7506 144.78 42.8206 141.42 42.8206C136.99 42.8206 133.35 40.0406 133.07 35.0406H156.78C156.92 33.4706 156.92 32.7506 156.92 32.1106V32.1006ZM133.14 29.7406C133.78 25.3806 136.85 22.7406 141.64 22.7406C146.43 22.7406 149.07 25.2406 149.49 29.7406H133.14Z"
            fill="#FF4F17"
          ></path>
          <path
            d="M98.8005 37.9506C97.5905 41.3806 95.3005 42.8106 91.8705 42.8106C86.2305 42.8106 83.8005 38.3806 83.8005 32.7406C83.8005 27.1006 86.5805 22.7406 92.0105 22.7406C95.4405 22.7406 97.7205 24.5306 98.7905 27.6006H106.72C104.86 20.1006 99.2905 16.3906 91.8705 16.3906C81.8705 16.3906 76.2305 23.5306 76.2305 32.7406C76.2305 42.7406 82.8705 49.2406 91.8705 49.2406C100.87 49.2406 105.22 44.1706 106.72 37.9606H98.7905L98.8005 37.9506Z"
            fill="#FF4F17"
          ></path>
          <path
            d="M56.6095 17.7393C44.1095 26.8793 33.3295 38.8793 23.6895 48.9493C22.9795 49.6593 22.0495 50.1593 21.0495 50.1593C19.8395 50.1593 18.9095 49.4493 18.0495 48.1593C15.5495 44.4493 11.7695 35.4493 10.0495 31.5193C8.68954 28.3093 9.40954 25.6593 12.6195 24.3093C15.8295 23.0193 19.3995 22.8093 20.2595 26.4493C20.2595 26.4493 21.8995 32.8093 22.3995 34.6593C32.3295 25.4493 44.5395 15.6693 54.8895 9.66929C52.3195 4.80929 47.2495 1.5293 41.4695 1.5293H16.9795C8.54954 1.5293 1.76953 8.30929 1.76953 16.6693V41.2293C1.76953 49.5793 8.54954 56.3693 16.9795 56.3693H41.4695C49.8195 56.3693 56.6095 49.5893 56.6095 41.2293V17.7393V17.7393Z"
            fill="#FF4F17"
          ></path>
          <path
            d="M186.059 16.5006V19.3206C183.399 17.4806 180.179 16.3906 176.709 16.3906C167.639 16.3906 160.289 23.7406 160.289 32.8106C160.289 41.8806 167.639 49.2306 176.709 49.2306C180.189 49.2306 183.409 48.1406 186.059 46.3006V49.0906H193.489V16.5006H186.059ZM176.709 42.1606C171.539 42.1606 167.359 37.9706 167.359 32.8106C167.359 27.6506 171.549 23.4606 176.709 23.4606C181.869 23.4606 186.059 27.6506 186.059 32.8106C186.059 37.9706 181.869 42.1606 176.709 42.1606Z"
            fill="#FF4F17"
          ></path>
        </svg>
      </div>
    </Link>
  );
}

function FooterLogo() {
  return (
    <svg
      className="max-sm:w-20 max-sm:h-10"
      width="177"
      height="48"
      viewBox="0 0 177 48"
      fill="none"
    >
      <path
        d="M66.7936 45.5696H65.4542L68.4638 37.3184H69.9216L72.9312 45.5696H71.5918L69.2274 38.8171H69.1621L66.7936 45.5696ZM67.0182 42.3384H71.3631V43.3859H67.0182V42.3384Z"
        fill="#808080"
      ></path>
      <path
        d="M87.0036 36.8748C87.079 36.985 87.1168 37.0951 87.1168 37.2053L86.0982 43.3737C86.0982 43.4471 86.0982 43.5022 86.0982 43.5389C86.0982 43.7592 86.1359 43.9061 86.2114 43.9795C86.268 44.0346 86.4377 44.0897 86.4943 44.0897C86.5698 44.0897 86.6452 44.1264 86.7207 44.1998C86.7961 44.31 86.8338 44.4201 86.8338 44.5303L86.7772 45.081C86.7772 45.2279 86.7395 45.3197 86.6641 45.3564C86.5886 45.3931 86.4943 45.4482 86.3811 45.5216C86.268 45.5216 85.985 45.6318 85.7587 45.6318C85.2306 45.6318 84.8156 45.5032 84.5138 45.2462C84.2497 45.0259 84.1177 44.6955 84.1177 44.2549C84.1177 44.108 84.1366 43.9611 84.1743 43.8143C84.1743 43.7592 85.2494 37.1502 85.2494 37.0951C85.2494 36.8748 85.4758 36.7096 85.6455 36.7096H86.6641C86.815 36.7096 86.9281 36.7647 87.0036 36.8748ZM90.229 39.2431C90.3044 39.3532 90.3421 39.4634 90.3421 39.5735L89.4368 45.1361C89.3802 45.3564 89.2104 45.4665 89.0407 45.4665H88.0221C87.8712 45.4665 87.7581 45.4298 87.6826 45.3564C87.6072 45.2462 87.5694 45.1361 87.5694 45.0259L88.4748 39.4634C88.5314 39.2431 88.7011 39.0778 88.9275 39.0778H89.8894C90.0403 39.0778 90.1535 39.1329 90.229 39.2431ZM88.8709 38.3619C88.72 38.215 88.6446 38.0131 88.6446 37.756C88.6446 37.4256 88.7577 37.1502 88.9841 36.9299C89.1727 36.7463 89.4745 36.6545 89.8894 36.6545C90.1912 36.6545 90.4176 36.7096 90.5685 36.8198C90.7194 36.9666 90.7948 37.1686 90.7948 37.4256C90.7948 37.756 90.7005 38.0314 90.5119 38.2517C90.3233 38.4353 90.0026 38.5271 89.5499 38.5271C89.2481 38.5271 89.0218 38.472 88.8709 38.3619ZM104.319 39.6286C104.206 39.9958 104.017 40.3996 103.753 40.8402C103.338 41.5011 102.923 42.0152 102.508 42.3823H102.451L103.47 44.9158C103.508 44.9525 103.527 45.0076 103.527 45.081C103.527 45.3013 103.3 45.4665 103.074 45.4665H101.999C101.829 45.4665 101.659 45.3564 101.603 45.2462L100.697 43.0432H100.075L99.7353 45.1361C99.6787 45.3564 99.509 45.4665 99.3392 45.4665H98.3207C98.1698 45.4665 98.0566 45.4298 97.9812 45.3564C97.9057 45.2462 97.868 45.1361 97.868 45.0259L99.1695 37.0951C99.2261 36.8748 99.3958 36.7096 99.5656 36.7096H100.584C100.735 36.7096 100.848 36.7647 100.924 36.8748C100.999 36.985 101.037 37.0951 101.037 37.2053L100.301 41.6664H100.358C100.81 41.5562 100.98 41.5011 101.037 41.5011L101.093 41.4461C101.32 41.2992 101.603 40.9687 101.942 40.4547C102.206 40.0508 102.376 39.702 102.451 39.4083C102.508 39.2431 102.678 39.0778 102.848 39.0778H103.923C104.092 39.0778 104.206 39.1329 104.262 39.2431C104.375 39.3532 104.375 39.5184 104.319 39.6286ZM120.785 39.2431C120.861 39.3532 120.879 39.4634 120.842 39.5735L120.729 40.1793C120.729 40.3996 120.502 40.5098 120.332 40.5098H119.427L118.974 43.2635C118.974 43.337 118.974 43.392 118.974 43.4288C118.974 43.7592 119.088 43.8694 119.144 43.8694C119.201 43.9795 119.314 43.9795 119.371 43.9795C119.408 43.9795 119.465 43.9795 119.54 43.9795C119.578 43.9795 119.616 43.9795 119.653 43.9795C119.823 43.9795 119.823 44.0346 119.88 44.0346C119.88 44.0346 119.899 44.0346 119.936 44.0346C119.974 44.0713 119.993 44.0897 119.993 44.0897C120.106 44.1998 120.163 44.31 120.163 44.4752L120.05 45.081C120.05 45.1912 119.993 45.3013 119.823 45.3564C119.823 45.3931 119.823 45.4115 119.823 45.4115C119.767 45.4115 119.71 45.4665 119.653 45.4665C119.597 45.4665 119.088 45.6318 118.748 45.6318C118.144 45.6318 117.711 45.5032 117.447 45.2462C117.145 44.9892 116.994 44.6037 116.994 44.0897C116.994 43.8694 117.013 43.6674 117.051 43.4838L117.503 40.5098H117.277C117.126 40.5098 117.013 40.4731 116.937 40.3996C116.862 40.2895 116.824 40.1793 116.824 40.0692L116.937 39.4634C116.994 39.2431 117.164 39.0778 117.333 39.0778H117.786L118.182 37.8111C118.239 37.6459 118.409 37.5357 118.578 37.5357H119.427C119.54 37.5357 119.635 37.5725 119.71 37.6459C119.785 37.756 119.823 37.8662 119.823 37.9763L119.653 39.0778H120.446C120.559 39.0778 120.672 39.1329 120.785 39.2431ZM96.9061 39.6837C97.2833 40.1243 97.4719 40.7301 97.4719 41.5011C97.4719 41.9784 97.3965 42.4558 97.2456 42.9331C97.0947 43.3737 96.8872 43.8143 96.6231 44.2549C96.3213 44.6588 95.9064 44.9892 95.3782 45.2462C94.8124 45.5032 94.1711 45.6318 93.4543 45.6318C93.1525 45.6318 92.7942 45.595 92.3792 45.5216H92.3226L92.266 46.2926L92.0397 47.6144C91.9831 47.8347 91.8134 48 91.6436 48H90.6251C90.4742 48 90.361 47.9449 90.2855 47.8347C90.2101 47.7246 90.1724 47.6144 90.1724 47.5043L91.5304 39.4634C91.5304 39.2431 91.7002 39.0778 91.9265 39.0778H92.6055C92.7187 39.0778 92.813 39.1329 92.8885 39.2431C92.9639 39.3165 93.0016 39.4083 93.0016 39.5184V40.2344L93.0582 40.1243C93.0582 40.1243 93.6807 39.3532 94.6426 39.0778C94.9067 39.0044 95.1708 38.9677 95.4348 38.9677C96.0761 38.9677 96.5665 39.2063 96.9061 39.6837ZM95.548 41.8316C95.548 41.4644 95.4726 41.1523 95.3217 40.8953C95.2085 40.6383 95.0199 40.5098 94.7558 40.5098C94.4917 40.5098 94.1899 40.675 93.8504 41.0055C93.5109 41.3359 93.2091 41.7398 92.9451 42.2171L92.6621 43.9795C92.9639 44.0529 93.3034 44.0897 93.6807 44.0897C94.322 44.0897 94.7935 43.851 95.0953 43.3737C95.3971 42.8964 95.548 42.3823 95.548 41.8316ZM116.315 39.1329C116.428 39.2431 116.485 39.3532 116.428 39.5184L116.258 40.5098C116.202 40.675 116.089 40.8402 115.919 40.8402C115.579 40.9137 115.24 41.0422 114.9 41.2258C114.485 41.4828 114.146 41.7949 113.882 42.162L113.429 45.1361C113.372 45.3564 113.203 45.4665 112.976 45.4665H111.958C111.845 45.4665 111.731 45.4298 111.618 45.3564C111.543 45.2462 111.524 45.1361 111.562 45.0259L112.467 39.4634C112.467 39.2431 112.637 39.0778 112.863 39.0778H113.542C113.655 39.0778 113.75 39.1329 113.825 39.2431C113.901 39.3165 113.938 39.4083 113.938 39.5184V40.3996L113.995 40.2895C113.995 40.2895 114.448 39.7938 114.787 39.5735C115.07 39.4083 115.466 39.1329 115.919 39.0228C116.089 38.9677 116.202 39.0228 116.315 39.1329ZM111.279 39.6837L110.373 45.1361C110.373 45.3564 110.147 45.4665 109.977 45.4665H109.298C109.185 45.4665 109.091 45.4298 109.015 45.3564C108.94 45.2829 108.902 45.1728 108.902 45.0259V44.365L108.846 44.4752C108.846 44.4752 108.563 44.7506 108.28 44.9709C107.827 45.3013 107.374 45.4665 107.318 45.4665C107.054 45.5767 106.771 45.6318 106.469 45.6318C105.828 45.6318 105.318 45.3931 104.941 44.9158C104.602 44.4385 104.432 43.8326 104.432 43.0983C104.432 42.6944 104.47 42.3089 104.545 41.9417C104.621 41.5746 104.771 41.2074 104.998 40.8402C105.186 40.4731 105.432 40.161 105.733 39.904C105.997 39.6102 106.375 39.3899 106.865 39.2431C107.318 39.0595 107.846 38.9677 108.449 38.9677C109.166 38.9677 109.996 39.0595 110.939 39.2431C111.166 39.2981 111.279 39.4634 111.279 39.6837ZM109.242 40.6199H109.185C108.921 40.5098 108.582 40.4547 108.167 40.4547C107.563 40.4547 107.11 40.6934 106.809 41.1707C106.507 41.648 106.356 42.1804 106.356 42.7679C106.356 43.135 106.412 43.4471 106.526 43.7041C106.676 43.9244 106.865 44.0346 107.091 44.0346C107.356 44.0346 107.676 43.8694 108.053 43.5389C108.393 43.2085 108.695 42.8229 108.959 42.3823L109.242 40.6199ZM83.7216 38.3619H80.3831L80.0436 40.5649H82.6465C82.7597 40.5649 82.854 40.6199 82.9294 40.7301C83.0426 40.8035 83.0803 40.9137 83.0426 41.0605L82.9294 41.7214C82.9294 41.9417 82.7031 42.0519 82.5333 42.0519H79.7606L79.2514 45.1361C79.2514 45.3564 79.0816 45.4665 78.8553 45.4665H77.7236C77.6104 45.4665 77.5161 45.4298 77.4406 45.3564C77.3652 45.2462 77.3275 45.1361 77.3275 45.0259L78.6289 37.0951C78.6289 36.8748 78.7987 36.7647 79.025 36.7647H83.8348C83.948 36.7647 84.0611 36.8014 84.1743 36.8748C84.2498 36.985 84.2686 37.0951 84.2309 37.2053L84.1177 37.9763C84.1177 38.1966 83.948 38.3619 83.7216 38.3619Z"
        fill="#808080"
      ></path>
      <path
        d="M132.227 40.0013H130.953C130.904 39.7327 130.812 39.4963 130.679 39.2922C130.546 39.088 130.382 38.9148 130.189 38.7724C129.996 38.6301 129.779 38.5227 129.54 38.4501C129.303 38.3776 129.051 38.3414 128.784 38.3414C128.302 38.3414 127.871 38.4609 127.49 38.6999C127.111 38.939 126.812 39.2895 126.591 39.7515C126.374 40.2135 126.265 40.7775 126.265 41.4436C126.265 42.1151 126.374 42.6818 126.591 43.1438C126.812 43.6058 127.113 43.955 127.494 44.1913C127.875 44.4277 128.304 44.5459 128.78 44.5459C129.044 44.5459 129.295 44.511 129.531 44.4411C129.771 44.3686 129.987 44.2625 130.181 44.1229C130.374 43.9832 130.537 43.8126 130.671 43.6112C130.807 43.407 130.901 43.1734 130.953 42.9101L132.227 42.9142C132.159 43.3198 132.027 43.6931 131.831 44.0342C131.637 44.3726 131.388 44.6654 131.083 44.9125C130.781 45.1569 130.435 45.3463 130.046 45.4806C129.657 45.6149 129.232 45.682 128.772 45.682C128.048 45.682 127.403 45.5128 126.836 45.1744C126.27 44.8333 125.824 44.3458 125.497 43.7119C125.173 43.078 125.011 42.3219 125.011 41.4436C125.011 40.5626 125.174 39.8065 125.501 39.1753C125.828 38.5415 126.274 38.0553 126.84 37.7169C127.407 37.3758 128.051 37.2052 128.772 37.2052C129.216 37.2052 129.629 37.2683 130.013 37.3946C130.4 37.5181 130.747 37.7008 131.055 37.9425C131.362 38.1815 131.617 38.4743 131.818 38.8208C132.02 39.1646 132.156 39.5581 132.227 40.0013Z"
        fill="#808080"
      ></path>
      <path
        d="M136.281 45.6941C135.693 45.6941 135.179 45.5612 134.741 45.2953C134.303 45.0294 133.963 44.6574 133.72 44.1793C133.478 43.7012 133.357 43.1425 133.357 42.5032C133.357 41.8613 133.478 41.2999 133.72 40.8191C133.963 40.3384 134.303 39.965 134.741 39.6991C135.179 39.4332 135.693 39.3002 136.281 39.3002C136.869 39.3002 137.382 39.4332 137.82 39.6991C138.258 39.965 138.599 40.3384 138.841 40.8191C139.083 41.2999 139.204 41.8613 139.204 42.5032C139.204 43.1425 139.083 43.7012 138.841 44.1793C138.599 44.6574 138.258 45.0294 137.82 45.2953C137.382 45.5612 136.869 45.6941 136.281 45.6941ZM136.285 44.6829C136.666 44.6829 136.982 44.5835 137.232 44.3847C137.483 44.186 137.668 43.9214 137.787 43.591C137.91 43.2607 137.971 42.8967 137.971 42.4992C137.971 42.1044 137.91 41.7418 137.787 41.4114C137.668 41.0783 137.483 40.8111 137.232 40.6096C136.982 40.4082 136.666 40.3075 136.285 40.3075C135.901 40.3075 135.582 40.4082 135.329 40.6096C135.079 40.8111 134.892 41.0783 134.77 41.4114C134.65 41.7418 134.59 42.1044 134.59 42.4992C134.59 42.8967 134.65 43.2607 134.77 43.591C134.892 43.9214 135.079 44.186 135.329 44.3847C135.582 44.5835 135.901 44.6829 136.285 44.6829Z"
        fill="#808080"
      ></path>
      <path
        d="M140.567 45.5692V39.3808H141.739V40.388H141.817C141.948 40.0469 142.161 39.781 142.458 39.5903C142.755 39.3969 143.11 39.3002 143.524 39.3002C143.943 39.3002 144.294 39.3969 144.577 39.5903C144.863 39.7837 145.074 40.0496 145.21 40.388H145.276C145.425 40.0577 145.664 39.7945 145.99 39.5984C146.317 39.3996 146.706 39.3002 147.158 39.3002C147.727 39.3002 148.191 39.4762 148.551 39.828C148.913 40.1799 149.094 40.7104 149.094 41.4194V45.5692H147.873V41.5323C147.873 41.1133 147.757 40.8097 147.526 40.6217C147.294 40.4337 147.018 40.3397 146.697 40.3397C146.299 40.3397 145.99 40.4606 145.77 40.7023C145.549 40.9413 145.439 41.2489 145.439 41.6249V45.5692H144.222V41.4557C144.222 41.12 144.116 40.85 143.904 40.6459C143.691 40.4418 143.415 40.3397 143.075 40.3397C142.843 40.3397 142.63 40.4001 142.434 40.521C142.24 40.6392 142.084 40.8044 141.964 41.0166C141.847 41.2287 141.788 41.4745 141.788 41.7538V45.5692H140.567Z"
        fill="#808080"
      ></path>
      <path
        d="M150.73 47.8899V39.3808H151.923V40.384H152.025C152.096 40.2551 152.198 40.106 152.331 39.9368C152.464 39.7676 152.65 39.6199 152.886 39.4936C153.123 39.3647 153.436 39.3002 153.826 39.3002C154.332 39.3002 154.784 39.4265 155.181 39.679C155.579 39.9314 155.891 40.2954 156.117 40.7708C156.345 41.2462 156.46 41.8183 156.46 42.4871C156.46 43.1559 156.347 43.7294 156.121 44.2075C155.895 44.6829 155.584 45.0495 155.19 45.3074C154.795 45.5625 154.344 45.6901 153.838 45.6901C153.457 45.6901 153.145 45.627 152.903 45.5007C152.663 45.3745 152.475 45.2268 152.339 45.0576C152.203 44.8883 152.098 44.7379 152.025 44.6063H151.951V47.8899H150.73ZM151.927 42.475C151.927 42.9101 151.991 43.2916 152.119 43.6192C152.247 43.9469 152.432 44.2034 152.674 44.3888C152.916 44.5714 153.213 44.6627 153.564 44.6627C153.929 44.6627 154.234 44.5674 154.479 44.3767C154.724 44.1833 154.909 43.9214 155.034 43.591C155.162 43.2607 155.226 42.8887 155.226 42.475C155.226 42.0668 155.164 41.7001 155.038 41.3751C154.916 41.0501 154.731 40.7936 154.483 40.6056C154.238 40.4176 153.932 40.3236 153.564 40.3236C153.21 40.3236 152.911 40.4136 152.666 40.5935C152.424 40.7735 152.24 41.0246 152.115 41.3469C151.989 41.6692 151.927 42.0453 151.927 42.475Z"
        fill="#808080"
      ></path>
      <path
        d="M159.653 45.7062C159.255 45.7062 158.896 45.6337 158.575 45.4887C158.254 45.3409 157.999 45.1274 157.811 44.8481C157.626 44.5687 157.534 44.2263 157.534 43.8207C157.534 43.4715 157.602 43.1841 157.738 42.9585C157.874 42.7329 158.058 42.5543 158.289 42.4226C158.52 42.291 158.779 42.1917 159.065 42.1245C159.351 42.0574 159.642 42.0063 159.939 41.9714C160.314 41.9284 160.619 41.8935 160.853 41.8667C161.088 41.8371 161.258 41.7901 161.364 41.7256C161.47 41.6612 161.523 41.5564 161.523 41.4114V41.3832C161.523 41.0313 161.422 40.7587 161.221 40.5653C161.022 40.3719 160.726 40.2752 160.331 40.2752C159.92 40.2752 159.596 40.3652 159.359 40.5452C159.125 40.7224 158.963 40.9199 158.873 41.1374L157.725 40.8796C157.862 40.5035 158.06 40.2 158.322 39.969C158.586 39.7354 158.889 39.5661 159.232 39.4614C159.575 39.354 159.936 39.3002 160.314 39.3002C160.565 39.3002 160.83 39.3298 161.111 39.3889C161.394 39.4453 161.658 39.55 161.903 39.7031C162.151 39.8562 162.353 40.0751 162.511 40.3598C162.669 40.6419 162.748 41.0085 162.748 41.4597V45.5692H161.556V44.7232H161.507C161.428 44.8789 161.309 45.032 161.152 45.1825C160.994 45.3329 160.791 45.4578 160.543 45.5571C160.295 45.6565 159.999 45.7062 159.653 45.7062ZM159.918 44.7393C160.256 44.7393 160.544 44.6735 160.784 44.5419C161.026 44.4102 161.21 44.2383 161.335 44.0262C161.463 43.8113 161.527 43.5816 161.527 43.3372V42.5395C161.484 42.5825 161.399 42.6228 161.274 42.6604C161.152 42.6953 161.011 42.7262 160.853 42.753C160.696 42.7772 160.542 42.8 160.392 42.8215C160.242 42.8403 160.117 42.8564 160.016 42.8699C159.779 42.8994 159.563 42.9491 159.367 43.0189C159.174 43.0888 159.019 43.1895 158.902 43.3211C158.787 43.45 158.73 43.6219 158.73 43.8368C158.73 44.1349 158.842 44.3606 159.065 44.5137C159.288 44.6641 159.573 44.7393 159.918 44.7393Z"
        fill="#808080"
      ></path>
      <path
        d="M165.595 41.8949V45.5692H164.375V39.3808H165.546V40.388H165.624C165.768 40.0604 165.994 39.7971 166.302 39.5984C166.612 39.3996 167.003 39.3002 167.474 39.3002C167.901 39.3002 168.276 39.3889 168.597 39.5661C168.918 39.7407 169.167 40.0013 169.344 40.3478C169.521 40.6942 169.61 41.1227 169.61 41.633V45.5692H168.389V41.778C168.389 41.3295 168.27 40.979 168.033 40.7265C167.797 40.4713 167.471 40.3437 167.057 40.3437C166.774 40.3437 166.522 40.4042 166.302 40.525C166.084 40.6459 165.911 40.8232 165.783 41.0568C165.658 41.2878 165.595 41.5672 165.595 41.8949Z"
        fill="#808080"
      ></path>
      <path
        d="M171.794 47.8899C171.612 47.8899 171.446 47.8751 171.296 47.8456C171.146 47.8187 171.035 47.7892 170.961 47.7569L171.255 46.7699C171.479 46.8289 171.677 46.8545 171.852 46.8464C172.026 46.8383 172.18 46.7739 172.313 46.653C172.449 46.5321 172.569 46.3347 172.672 46.0608L172.823 45.6498L170.528 39.3808H171.835L173.424 44.1833H173.489L175.078 39.3808H176.388L173.803 46.3952C173.684 46.7175 173.531 46.9901 173.346 47.213C173.161 47.4387 172.94 47.6079 172.685 47.7207C172.429 47.8335 172.132 47.8899 171.794 47.8899Z"
        fill="#808080"
      ></path>
      <path
        d="M31.5953 9.13613C24.3883 14.3246 18.1615 21.0921 12.6266 26.7316C12.223 27.1264 11.6464 27.4084 11.0699 27.4084C10.378 27.4084 9.85911 27.0136 9.34021 26.2805C7.89882 24.1938 5.76556 19.1182 4.72776 16.9188C3.97824 15.1141 4.38183 13.6478 6.22681 12.8583C8.07179 12.1251 10.1474 12.0123 10.6663 14.0426C10.6663 14.0426 11.5888 17.6519 11.8771 18.7234C17.585 13.4786 24.619 8.00821 30.6151 4.62446C29.1161 1.86106 26.2333 0 22.8893 0H8.76366C3.86293 0 0 3.83492 0 8.57217V22.3892C0 27.1264 3.86293 30.9613 8.76366 30.9613H22.8893C27.6747 30.9613 31.5953 27.1264 31.5953 22.3892V9.13613Z"
        fill="#808080"
      ></path>
      <path
        d="M142.813 8.40363C139.181 8.40363 137.336 9.98271 137.336 13.4793V26.8451H141.66V13.7048C141.66 12.5205 142.179 11.9566 143.39 11.9566H147.137V8.40363H142.813Z"
        fill="#808080"
      ></path>
      <path
        d="M151.692 0.0570679C150.308 0.0570679 149.155 1.18499 149.155 2.59488C149.155 3.94838 150.308 5.0763 151.692 5.0763C153.133 5.0763 154.286 3.94838 154.286 2.59488C154.286 1.18499 153.133 0.0570679 151.692 0.0570679Z"
        fill="#808080"
      ></path>
      <path
        d="M149.616 8.2901V26.8443H153.825V8.2901H149.616Z"
        fill="#808080"
      ></path>
      <path
        d="M68.8979 23.3486C67.6295 23.3486 67.1106 23.0102 67.1106 21.7695V0.0570679H62.8441V21.7695C62.8441 25.4352 64.9197 26.9015 68.206 26.9015H70.5123V23.3486H68.8979Z"
        fill="#808080"
      ></path>
      <path
        d="M119.521 8.34717C115.888 8.34717 114.101 9.86986 114.101 13.4228V26.845H118.368V13.6484C118.368 12.4641 118.944 11.9001 120.155 11.9001H123.902V8.34717H119.521Z"
        fill="#808080"
      ></path>
      <path
        d="M130.59 8.34547V3.72101H126.324V21.7677C126.324 25.2642 128.169 26.8433 131.743 26.8433H134.972V23.2904H132.378C131.224 23.2904 130.59 22.8956 130.59 21.7677V11.8984H134.972V8.34547H130.59Z"
        fill="#808080"
      ></path>
      <path
        d="M161.665 8.46002V10.0391C163.222 9.02398 165.067 8.40363 167.085 8.40363C172.332 8.40363 176.54 12.5205 176.54 17.6525C176.54 22.7846 172.332 26.9015 167.085 26.9015C165.067 26.9015 163.222 26.2811 161.665 25.266V34.9097H157.399V8.46002H161.665ZM167.085 22.8974C170.025 22.8974 172.447 20.5851 172.447 17.6525C172.447 14.72 170.025 12.3513 167.085 12.3513C164.087 12.3513 161.665 14.72 161.665 17.6525C161.665 20.5851 164.087 22.8974 167.085 22.8974Z"
        fill="#808080"
      ></path>
      <path
        d="M89.3667 18.8933H75.7023C75.8753 21.7131 77.9509 23.2921 80.4877 23.2921C82.448 23.2921 83.7741 22.6718 84.466 21.3747H89.0784C87.8677 24.8148 85.3885 26.9015 80.6031 26.9015C75.1834 26.9015 71.3205 23.1793 71.3205 17.5962C71.3205 12.2385 74.8375 8.40363 80.4877 8.40363C85.5614 8.40363 89.4244 11.6182 89.4244 17.2578C89.4244 17.5962 89.4244 17.9909 89.3667 18.8933ZM85.1578 15.9043C84.9272 13.3665 83.3705 11.9566 80.6031 11.9566C77.8932 11.9566 76.1059 13.4793 75.7023 15.9043H85.1578Z"
        fill="#808080"
      ></path>
      <path
        d="M55.9257 20.5287C55.2338 22.5026 53.9077 23.2921 51.9474 23.2921C48.6611 23.2921 47.2773 20.8107 47.2773 17.5962C47.2773 14.3816 48.8917 11.9566 52.0051 11.9566C53.9654 11.9566 55.2915 12.9717 55.9257 14.72H60.4805C59.4427 10.4903 56.214 8.40363 51.9474 8.40363C46.1819 8.40363 42.8955 12.4077 42.8955 17.5962C42.8955 23.2357 46.7584 26.9015 51.9474 26.9015C57.1364 26.9015 59.6156 24.0253 60.4805 20.5287H55.9257Z"
        fill="#808080"
      ></path>
      <path
        d="M110.526 8.46002V26.8451H106.259V25.266C104.703 26.2811 102.858 26.9015 100.84 26.9015C95.5931 26.9015 91.3842 22.7846 91.3842 17.6525C91.3842 12.5205 95.5931 8.40363 100.84 8.40363C102.858 8.40363 104.703 9.02398 106.259 10.0391V8.46002H110.526ZM106.202 17.6525C106.202 14.72 103.78 12.3513 100.84 12.3513C97.8416 12.3513 95.4201 14.72 95.4201 17.6525C95.4201 20.5851 97.8416 22.8974 100.84 22.8974C103.78 22.8974 106.202 20.5851 106.202 17.6525Z"
        fill="#808080"
      ></path>
    </svg>
  );
}

export { Logo, FooterLogo };