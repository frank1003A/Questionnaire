import { MutableRefObject } from "react";

/**DateTime Conversion */
export const convertDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
  };
  
  /**Figure Formater */
  export const formatNumberWithCommas = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  interface RenderImgArgs {
    /**
     * Javascript File Object to obtain base64 string 
    */
    file: File;
    /**
     *  React mutable `ref` object. Pass `useRef` hook
     */
    element: MutableRefObject<HTMLImageElement | null>;
  }

  /**Renders Image from File*/
export const renderImagePreview = ({ file, element }: RenderImgArgs) => {
  const preview = element.current as HTMLImageElement;
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    // result is a base64 string
    if (reader.result !== null) {
      preview.src = reader.result as string;
    }
  });
  reader.readAsDataURL(file);
};
  