const validateName = function (name) {
  let pattern = /[^a-z, ' ']/gi;
  if (name.match(pattern)) {
    return false;
  }
  return true;
};

module.exports = { validateName };
