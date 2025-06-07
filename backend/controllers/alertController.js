export const getAlerts = async (req, res) => {
  try {
    const userId = req.user._id;
    const alerts = await Alert.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ message: 'Failed to fetch alerts' });
  }
}