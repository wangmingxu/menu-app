export default (func, options) => new Promise((resolve, reject) => {
  func(Object.assign(
    {
      success(ret) {
        console.log(ret);
        resolve(ret);
      },
      fail(ret) {
        console.log(ret);
        reject(ret);
      },
    },
    options,
  ));
});

export const sleep = milsec => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, milsec);
});

