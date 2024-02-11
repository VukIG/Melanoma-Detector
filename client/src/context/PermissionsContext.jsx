import { createContext, useState } from "react";

const PermissionsContext = createContext();

export const PermissionProvider = ({ children }) => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [galleryPermission, setGalleryPermission] = useState(false);

  return (
    <PermissionsContext.Provider
      value={{
        cameraPermission,
        setCameraPermission,
        galleryPermission,
        setGalleryPermission,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export default PermissionsContext;
