const bioproject = {
  one: "bioproject",
  all: "bioprojects",

  prefix: "TRGTBPR000",
  usr_prefix: 'USRBPR000',
  connections: [{
    name: "works_on",
    display_name: "Lab",
    placeholder: "Link to Lab accession",
    allow_multiple: true,
    to: "lab",
    all: "labs",
    required: true
  }]
};

module.exports = bioproject;
