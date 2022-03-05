import * as FileSystem from "expo-file-system";

export const CREATE_SHOP = "CREATE_SHOP";

export const createShop = (shopName, description, img) => {
  return async (disaptch, getState) => {
    const token = getState().auth.token;

    const formData = new FormData();
    formData.append("name", shopName);
    formData.append("description", description);
    formData.append("hasTables", true);
    formData.append("hasParkingLot", false);
    formData.append("image", img);

    const response = await fetch("http://localhost:8080/shop/register", {
      method: "POST",

      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseDate = await response.json();

    console.log(responseData);

    // disaptch({
    //   type: CREATE_SHOP,
    //   shopData: {
    //     shopName,
    //     description,
    //          newPath
    //   },
    // });
  };
};
