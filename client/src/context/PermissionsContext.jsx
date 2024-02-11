import { createContext, useState } from "react";

const PermissionsContext = createContext();

export const PermissionProvider = ({ children }) => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [galleryPermission, setGalleryPermission] = useState(false);
  const [image, setImage] = useState('');

  return (
    <PermissionsContext.Provider
      value={{
        cameraPermission,
        setCameraPermission,
        galleryPermission,
        setGalleryPermission,
        image,
        setImage,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export default PermissionsContext;
