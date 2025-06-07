import User from '../models/userModel.js';

/**
 * @desc    Get the logged-in user's profile
 * @route   GET /api/user/profile
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -__v');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error('Get User Profile Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @desc    Update user preferences
 * @route   PUT /api/user/preferences
 * @access  Private
 */
export const updateUserPreferences = async (req, res) => {
  try {
    const {
      theme,
      currency,
      defaultView,
      language,
      defaultIncomeCategoryId,
      defaultExpenseCategoryId,
      notificationSettings,
    } = req.body;

    const updates = {};

    if (theme) updates['preferences.theme'] = theme;
    if (currency) updates['preferences.currency'] = currency;
    if (defaultView) updates['preferences.defaultView'] = defaultView;
    if (language) updates['preferences.language'] = language;
    if (defaultIncomeCategoryId) updates['preferences.defaultIncomeCategoryId'] = defaultIncomeCategoryId;
    if (defaultExpenseCategoryId) updates['preferences.defaultExpenseCategoryId'] = defaultExpenseCategoryId;
    
    if (notificationSettings) {
      if (typeof notificationSettings.email === 'boolean') {
        updates['preferences.notificationSettings.email'] = notificationSettings.email;
      }
      if (typeof notificationSettings.sms === 'boolean') {
        updates['preferences.notificationSettings.sms'] = notificationSettings.sms;
      }
      if (typeof notificationSettings.push === 'boolean') {
        updates['preferences.notificationSettings.push'] = notificationSettings.push;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password -__v');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Preferences updated', user: updatedUser });
  } catch (error) {
    console.error('Update Preferences Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

