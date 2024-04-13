
import express, { Express, Request, Response, NextFunction } from 'express';
// import createError  from 'http-errors';
const app: Express = express();

//Import cac Routes

import routeUser from './routes/v1/users.route';
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Định nghiax các routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: 'Express + TypeScript Server'});
});

//Cau hinh route cho App
//http://localhost:8080/api/v1/users

app.use('/api/v1/users', routeUser);

// catch 404 and forward to error handler
// app.use(function (req: Request, res: Response, next: NextFunction) {
//   next(createError(404));
// });

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

//   const statusCode = err.status || 500;
//   // res.status(statusCode).json({ 
//   //   statusCode: statusCode, 
//   //   message: err.message 
//   // });
//   sendJsonErrors(req,res,err)
});
export default app;