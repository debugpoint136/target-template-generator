const treatment = {
  one: "treatment",
  all: "treatments",

  prefix: "TRGTTMT000",
  usr_prefix: 'USRTMT000',
  connections: [
    {
      name: "challenged_with",
      display_name: "Challenge diet",
      placeholder: "Link to Diet accession (if applicable)",
      allow_multiple: true,
      to: "diet",
      all: "diets"
    }
  ]
};

module.exports = treatment;
