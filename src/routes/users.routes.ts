import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const upload = multer(uploadConfig);

/**
 * repositories
 * services
 */

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUSer = new CreateUserService();

  const user = await createUSer.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});
// utilizado para alterar apenas uma informção do usuário

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.excute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;
    return response.json(user);
  },
);

export default usersRouter;
