// assay == 51 biosample == 51 diet == 3 file == 100 litter == 19 mouse == 33 treatment == 3
WITH assay, row, CASE  WHEN (row.recruits <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (assay_recruits_reagent:reagent {accession:row.recruits})
    MERGE (assay)-[:recruits]->(assay_recruits_reagent))

WITH assay, row, CASE  WHEN (row.assay_input <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (assay_assay_input_biosample:biosample {accession:row.assay_input})
    MERGE (assay)-[:assay_input]->(assay_assay_input_biosample))

WITH assay, row, CASE  WHEN (row.pooled_from <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (assay_pooled_from_assay:assay {accession:row.pooled_from})
    MERGE (assay)-[:pooled_from]->(assay_pooled_from_assay))

WITH biosample, row, CASE  WHEN (row.derived_from <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (biosample_derived_from_mouse:mouse {accession:row.derived_from})
    MERGE (biosample)-[:derived_from]->(biosample_derived_from_mouse))

WITH biosample, row, CASE  WHEN (row.pooled_from <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (biosample_pooled_from_biosample:biosample {accession:row.pooled_from})
    MERGE (biosample)-[:pooled_from]->(biosample_pooled_from_biosample))

WITH file, row, CASE  WHEN (row.paired_file <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (file_paired_file_file:file {accession:row.paired_file})
    MERGE (file)-[:paired_file]->(file_paired_file_file))

WITH file, row, CASE  WHEN (row.sequenced <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (file_sequenced_assay:assay {accession:row.sequenced})
    MERGE (file)-[:sequenced]->(file_sequenced_assay))

WITH litter, row, CASE  WHEN (row.part_of <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (litter_part_of_bioproject:bioproject {accession:row.part_of})
    MERGE (litter)-[:part_of]->(litter_part_of_bioproject))

WITH litter, row, CASE  WHEN (row.sire <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (litter_sire_mouse:mouse {accession:row.sire})
    MERGE (litter)-[:sire]->(litter_sire_mouse))

WITH litter, row, CASE  WHEN (row.dam <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (litter_dam_mouse:mouse {accession:row.dam})
    MERGE (litter)-[:dam]->(litter_dam_mouse))

WITH mouse, row, CASE  WHEN (row.born_to <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (mouse_born_to_litter:litter {accession:row.born_to})
    MERGE (mouse)-[:born_to]->(mouse_born_to_litter))

WITH mouse, row, CASE  WHEN (row.fed <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (mouse_fed_diet:diet {accession:row.fed})
    MERGE (mouse)-[:fed]->(mouse_fed_diet))

WITH mouse, row, CASE  WHEN (row.undergoes <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (mouse_undergoes_treatment:treatment {accession:row.undergoes})
    MERGE (mouse)-[:undergoes]->(mouse_undergoes_treatment))

WITH mouse, row, CASE  WHEN (row.part_of <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (mouse_part_of_bioproject:bioproject {accession:row.part_of})
    MERGE (mouse)-[:part_of]->(mouse_part_of_bioproject))

WITH treatment, row, CASE  WHEN (row.challenged_with <> "") THEN ['ok'] ELSE [] END as array1
FOREACH (el1 in array1 | MERGE (treatment_challenged_with_diet:diet {accession:row.challenged_with})
    MERGE (treatment)-[:challenged_with]->(treatment_challenged_with_diet))
