const mouse = {
  one: "mouse",
  all: "mice",

  prefix: "TRGTMSE000",
  usr_prefix: 'USRMSE000',
  connections: [
    {
      name: "born_to",
      display_name: "Litter",
      placeholder: "Link to Litter accession",
      to: "litter",
      all: "litters",
      required: true
    },
    {
      name: "fed",
      display_name: "Diet",
      placeholder: "Primary diet (link to Diet accession)",
      allow_multiple: true,
      to: "diet",
      all: "diets",
      required: true
    },
    {
      name: "undergoes",
      display_name: "Treatment",
      placeholder: "Exposure regimen (link to Treatment accession)",
      to: "treatment",
      all: "treatments",
      required: true
    },
    {
      name: "part_of",
      display_name: "Bioproject",
      placeholder: "Link to Bioproject accession",
      allow_multiple: true,
      to: "bioproject",
      all: "bioprojects",
      required: true
    }
  ]
};

module.exports = mouse;
