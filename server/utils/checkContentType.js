function checkContentType(req, expectedContentType) {
  var contype = req.get("Content-Type").split(";")[0];
  console.log("contype", contype);
  if (!contype || contype !== expectedContentType) {
    console.log("contype", contype, "expectedContentType", expectedContentType);
    throw new Error("415 Unsupported Content Type");
  }
}

module.exports = checkContentType;
