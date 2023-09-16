import contactService from "../service/contact-service.js";

const create = async (req, res, next) => {
  try {
    const result = await contactService.create(req);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await contactService.get(req.params);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await contactService.update(req);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await contactService.remove(req);
    res.status(200).json({
      data: "Ok",
    });
  } catch (err) {
    next(err);
  }
};

const search = async (req, res, next) => {
  try {
    const result = await contactService.search(req);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export default { create, get, update, remove, search };
