import addressService from "../service/address-service.js";

const create = async (req, res, next) => {
  try {
    const result = await addressService.create(req);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await addressService.update(req);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await addressService.get(req);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const result = await addressService.list(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await addressService.remove(req);
    res.status(200).json({
      data: "Ok",
    });
  } catch (error) {
    next(error);
  }
};

export default { create, update, get, list, remove };
