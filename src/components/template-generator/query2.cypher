WITH {json} as data
    UNWIND data.assay as row
    MERGE (assay:assay {accession: row.accession})
    SET 
        assay.user_accession = row.user_accession,
		assay.category = row.category,
		assay.technique = row.technique,
		assay.assay_target = row.assay_target,
		assay.population = row.population,
		assay.subcellular_fraction = row.subcellular_fraction,
		assay.strand_specificity = row.strand_specificity,
		assay.assay_protocol = row.assay_protocol,
		assay.starting_cells = row.starting_cells,
		assay.tissue_weight = row.tissue_weight,
		assay.starting_cell_count = row.starting_cell_count,
		assay.starting_nucleic_acid = row.starting_nucleic_acid,
		assay.date_extracted = row.date_extracted,
		assay.date_performed = row.date_performed,
		assay.processed_by = row.processed_by,
		assay.detergent_added = row.detergent_added,
		assay.filtering_method = row.filtering_method,
		assay.comments = row.comments

        WITH assay, row, CASE  WHEN (row.recruits <> "") THEN ['ok'] ELSE [] END as array1
        FOREACH (el1 in array1 | MERGE (assay_recruits_reagent:reagent {accession:row.recruits})
            MERGE (assay)-[:recruits]->(assay_recruits_reagent))
        
        WITH assay, row, CASE  WHEN (row.assay_input <> "") THEN ['ok'] ELSE [] END as array1
        FOREACH (el1 in array1 | MERGE (assay_assay_input_biosample:biosample {accession:row.assay_input})
            MERGE (assay)-[:assay_input]->(assay_assay_input_biosample))
        
        WITH assay, row, CASE  WHEN (row.pooled_from <> "") THEN ['ok'] ELSE [] END as array1
        FOREACH (el1 in array1 | MERGE (assay_pooled_from_assay:assay {accession:row.pooled_from})
            MERGE (assay)-[:pooled_from]->(assay_pooled_from_assay))
        
WITH {json} as data
    UNWIND data.biosample as row
    MERGE (biosample:biosample {accession: row.accession})
    SET 
        biosample.user_accession = row.user_accession,
		biosample.tissue_classification = row.tissue_classification,
		biosample.sample_type = row.sample_type,
		biosample.tissue = row.tissue,
		biosample.specific_tissue = row.specific_tissue,
		biosample.collection_protocol = row.collection_protocol,
		biosample.organ_weight = row.organ_weight,
		biosample.liver_hist_image_HE = row.liver_hist_image_HE,
		biosample.liver_hist_image_ORO = row.liver_hist_image_ORO,
		biosample.cell_culture_protocol = row.cell_culture_protocol,
		biosample.culture_length = row.culture_length,
		biosample.passage_number = row.passage_number,
		biosample.comments = row.comments

        WITH biosample, row, CASE  WHEN (row.derived_from <> "") THEN ['ok'] ELSE [] END as array1
        FOREACH (el1 in array1 | MERGE (biosample_derived_from_mouse:mouse {accession:row.derived_from})
            MERGE (biosample)-[:derived_from]->(biosample_derived_from_mouse))
        

        WITH biosample, row, CASE  WHEN (row.pooled_from <> "") THEN ['ok'] ELSE [] END as array1
        FOREACH (el1 in array1 | MERGE (biosample_pooled_from_biosample:biosample {accession:row.pooled_from})
            MERGE (biosample)-[:pooled_from]->(biosample_pooled_from_biosample))

WITH {json} as data
    UNWIND data.mouse as row
    MERGE (mouse:mouse {accession: row.accession})
    SET 
        mouse.user_accession = row.user_accession,
		mouse.organism = row.organism,
		mouse.source = row.source,
		mouse.strain = row.strain,
		mouse.sex = row.sex,
		mouse.internal_id = row.internal_id,
		mouse.mouse_age_collection = row.mouse_age_collection,
		mouse.life_stage_collection = row.life_stage_collection,
		mouse.animal_weight_sac = row.animal_weight_sac,
		mouse.perfusion = row.perfusion,
		mouse.fasted = row.fasted,
		mouse.fasted_hours = row.fasted_hours,
		mouse.liver_tumors = row.liver_tumors,
		mouse.tumor_organs = row.tumor_organs,
		mouse.technicians = row.technicians,
		mouse.comments = row.comments

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
        