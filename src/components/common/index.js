import useLocalState from "./useLocalState";
function classNamesFx(...classes) {
    return classes.filter(Boolean).join(' ')
}

function getCurrentYear(){
    return new Date().getFullYear();
}

function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return false;
    }
    return true;
}

function isStrongPassword(password) {
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharacterRegex = /[$&+,:;=?@#|'<>.^*()%!-]/;

  return (
    password.length >= 4 &&
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    numberRegex.test(password) &&
    specialCharacterRegex.test(password)
  );
}

function commonStyleClasses(formForm, errorKey, fromAdmin = false) {
  return {
    parentDiv: `bg-bgColor2 mx-auto rounded-lg text-center w-11/12 ${formForm ? "md:w-4/6 lg:w-1/2" : "md:w-5/6 lg:w-11/12"} p-5 shadow-lg shadow-bgColor2 animate__animated animate__zoomInUp animate__faster ${fromAdmin ? "bg-boxdark" : ""}`,
    adminDiv: `mx-auto rounded-lg text-center w-12/12 md:w-11/12 lg:w-10/12 p-5 shadow-lg shadow-bgColor2 animate__animated animate__zoomInUp animate__faster dark:bg-boxdark bg-white text-boxdark dark:text-textColor`,
    inputText: `mb-6 w-full sm:w-2/3 rounded-md border bg-transparent px-5 py-3 text-base text-textColor focus:border-primary focus-visible:shadow-none ${errorKey ? "border-red-500" : "border-textColorMiddle"}`
  };
}


function isValidPhoneNumber(phoneNumber) {
  const regex = /^(078|072|073)\d{7}$|^\+?25(078|072|073)\d{7}$/;
  return regex.test(phoneNumber);
}


function disableDevTools() {
    document.addEventListener('contextmenu', (e) => e.preventDefault());
  
    function ctrlShiftKey(e, keyCode) {
      return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
    }
  
    document.onkeydown = (e) => {
      if (
        e.keyCode === 123 || // F12
        ctrlShiftKey(e, 'I') || // Ctrl + Shift + I
        ctrlShiftKey(e, 'J') || // Ctrl + Shift + J
        ctrlShiftKey(e, 'C') || // Ctrl + Shift + C
        (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) // Ctrl + U
      )
        return false;
    };
  }


  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function convertToHumanFriendlyDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
}

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

function truncateWord(word, length) {
  if (word.length <= length) {
    return word;
  }
  return word.substring(0, length) + '...';
}

const serverLink1 = "http://localhost:9090/";
const serverLink = "https://etite-event-management-platform-backend.onrender.com/";

export {
    classNamesFx,
    getCurrentYear,
    isEmailValid,
    disableDevTools,
    isStrongPassword,
    isValidPhoneNumber,
    commonStyleClasses,
    shuffleArray,
    convertToHumanFriendlyDate,
    useLocalState,
    serverLink,
    convertBase64,
    truncateWord,
}