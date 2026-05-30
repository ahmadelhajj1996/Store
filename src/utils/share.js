<<<<<<< HEAD

export const getBaseUrl = () => {
  return window.location.origin; 
};

export const buildProductUrl = (productId) => {
  return `${getBaseUrl()}/items/${productId}`;
};

export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    return true;
  } catch (err) {
    console.error("Copy failed:", err);
    return false;
  }
};

export const shareProduct = async (productId) => {
  const url = buildProductUrl(productId);
  const success = await copyToClipboard(url);

  return {
    success,
    url,
  };
=======

export const getBaseUrl = () => {
  return window.location.origin; 
};

export const buildProductUrl = (productId) => {
  return `${getBaseUrl()}/items/${productId}`;
};

export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    return true;
  } catch (err) {
    console.error("Copy failed:", err);
    return false;
  }
};

export const shareProduct = async (productId) => {
  const url = buildProductUrl(productId);
  const success = await copyToClipboard(url);

  return {
    success,
    url,
  };
>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
};