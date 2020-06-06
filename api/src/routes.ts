import { Router } from "express";
import PointsControllers from "./controllers/PointsController";
import ItemsControllers from "./controllers/ItemsController";
import multer from "multer";
import multerConfig from "./config/multer";
import { celebrate, Joi } from "celebrate";

const pointsController = new PointsControllers();
const itemsController = new ItemsControllers();

const routes = Router();
const upload = multer(multerConfig);

routes.get("/items", itemsController.index);

routes.get("/points", pointsController.index);
routes.post(
	"/points",
	upload.single("image"),
	celebrate(
		{
			body: Joi.object().keys({
				name: Joi.string().required(),
				email: Joi.string().required().email(),
				whatsapp: Joi.number().required(),
				latitude: Joi.number().required(),
				longitude: Joi.number().required(),
				city: Joi.string().required(),
				uf: Joi.string().required(),
				items: Joi.string().required(),
			}),
		},
		{ abortEarly: false }
	),
	pointsController.create
);
routes.get("/points/:id", pointsController.show);

export default routes;
