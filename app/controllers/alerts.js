const Alert = require('../models/alert');
const { saveSchema, updateSchema } = require('../validators/alerts');
const { HTTP } = require('../helpers/constants');
const { joiErrorHandling, mongoErrorHandling, commonErrorHandling } = require('../helpers/error-handler');

const find = async (req, res) => {
  const alerts = await Alert.find({});
  return res.status(HTTP.OK).json({ alerts });
};

const findById = async (req, res) => {
  const { id } = req.params;

  const alert = await Alert.findById(id)
  if(alert){
    res.json({ alert });
  }
  else{
    res.status(HTTP.NOT_FOUND).json({ message: 'Alert not found' });
  }
};

const save = async (req, res) => {
  const { email, term } = req.body;
  const { error } = saveSchema.validate(req.body);
  if (error) {
    return res.status(HTTP.UNPROCESSABLE_ENTITY).json(
      joiErrorHandling(error)
    );
  }

  const alert = await Alert.findOne({ email, term });
  if (alert) {
    return res.status(HTTP.UNPROCESSABLE_ENTITY).json(
      commonErrorHandling('term', 'Term already registered for this user')
    );
  }

  try {
    const alert = await Alert.create({ ...req.body })
    return res.status(HTTP.CREATED).json({ alert });
  } catch (err) {
    return res.status(HTTP.UNPROCESSABLE_ENTITY).json(
      mongoErrorHandling(err)
    );
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { email, frequency, term } = req.body;
  const { error } = updateSchema.validate(req.body);
  if (error) {
    return res.status(HTTP.UNPROCESSABLE_ENTITY).json(
      joiErrorHandling(error)
    );
  }
  let alert = await Alert.findOne({ email, term });
  if (alert) {
    return res.status(HTTP.UNPROCESSABLE_ENTITY).json(
      commonErrorHandling('term', 'Term already registered for this user')
    );
  }

  alert = await Alert.findById(id);
  if (!alert) {
    return res.status(HTTP.NOT_FOUND).json(
      commonErrorHandling('_id', 'Alert not found')
    );
  }

  const update = {
    ...alert._doc,
    email: email || alert.email,
    frequency: frequency || alert.frequency,
    term: term || alert.term
  }

  alert.overwrite(update);

  try {
    await alert.save();
    return res.status(HTTP.OK).json({ alert });
  } catch (error) {
    return res.status(HTTP.ERROR).json({ error });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await Alert.deleteOne({ _id: id })

    return res.status(HTTP.OK).json({
      _id: id,
      message: 'Notification successfully deleted'
    });
  } catch (err) {
    return res.status(HTTP.ERROR).json({ message: err });
  }
}

module.exports = {
  find,
  findById,
  save,
  update,
  remove
};
