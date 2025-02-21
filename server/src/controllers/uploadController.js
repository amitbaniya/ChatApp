export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const profilePicture = req.body.pictureName;

    res.status(200).json({ message: "Upload successful", profilePicture });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
