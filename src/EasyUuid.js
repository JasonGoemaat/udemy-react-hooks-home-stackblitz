const counter = 0;

const EasyUuid = () => {
  counter++;
  const dt = new Date();
  const time = dt.getTime().toString(16);
  const ms = (window.performance.now() * 1000).toFixed().toString(16);
  const rnd = (Math.trunc(Math.random() * 0x100000000)).toString(16);
  const uuid = `${time}-${ms}-${counter.toString(16)}-${rnd}`;
  return uuid;
}

export default EasyUuid;
