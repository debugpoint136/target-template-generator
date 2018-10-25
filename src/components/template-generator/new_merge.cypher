WITH {json} as data
    UNWIND data.treatment as row
    MERGE (treatment:treatment {accession: row.accession})
    SET 
        treatment.user_accession = row.user_accession,
		treatment.exposure_category = row.exposure_category,
		treatment.exposure_specific = row.exposure_specific,
		treatment.exposure_dose = row.exposure_dose,
		treatment.exposure_paradigm = row.exposure_paradigm,
		treatment.exposure_age_first = row.exposure_age_first,
		treatment.exposure_age_last = row.exposure_age_last,
		treatment.exposure_life_stage = row.exposure_life_stage,
		treatment.challenge_after_exposure = row.challenge_after_exposure,
		treatment.challenge_life_age_beginning = row.challenge_life_age_beginning,
		treatment.challenge_life_age_end = row.challenge_life_age_end,
		treatment.challenge_life_Stage = row.challenge_life_Stage,
		treatment.comments = row.comments,
		treatment.user = "Deepak Purushotham",
		treatment.lab = "undefined",
		treatment.last_updated = 1540434918465

WITH {json} as data
    UNWIND data.diet as row
    MERGE (diet:diet {accession: row.accession})
    SET 
        diet.user_accession = row.user_accession,
		diet.category = row.category,
		diet.description = row.description,
		diet.batchId = row.batchId,
		diet.comments = row.comments,
		diet.user = "Deepak Purushotham",
		diet.lab = "undefined",
		diet.last_updated = 1540434918466

WITH {json} as data
    UNWIND data.litter as row
    MERGE (litter:litter {accession: row.accession})
    SET 
        litter.user_accession = row.user_accession,
		litter.litter_size_total = row.litter_size_total,
		litter.litter_size_survived = row.litter_size_survived,
		litter.litter_number = row.litter_number,
		litter.number_males = row.number_males,
		litter.number_females = row.number_females,
		litter.age_at_mating = row.age_at_mating,
		litter.age_matched = row.age_matched,
		litter.dam_weight_mating = row.dam_weight_mating,
		litter.dam_weight_weaning = row.dam_weight_weaning,
		litter.dam_weight_preexposure = row.dam_weight_preexposure,
		litter.date_born = row.date_born,
		litter.comments = row.comments,
		litter.user = "Deepak Purushotham",
		litter.lab = "undefined",
		litter.last_updated = 1540434918467

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
		mouse.comments = row.comments,
		mouse.user = "Deepak Purushotham",
		mouse.lab = "undefined",
		mouse.last_updated = 1540434918468

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
		biosample.comments = row.comments,
		biosample.user = "Deepak Purushotham",
		biosample.lab = "undefined",
		biosample.last_updated = 1540434918468

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
		assay.comments = row.comments,
		assay.user = "Deepak Purushotham",
		assay.lab = "undefined",
		assay.last_updated = 1540434918469

WITH {json} as data
    UNWIND data.reagent as row
    MERGE (reagent:reagent {accession: row.accession})
    SET 
        reagent.user_accession = row.user_accession,
		reagent.reagent = row.reagent,
		reagent.source = row.source,
		reagent.product_id = row.product_id,
		reagent.lot = row.lot,
		reagent.antigen_sequence = row.antigen_sequence,
		reagent.clonality = row.clonality,
		reagent.host = row.host,
		reagent.isotype = row.isotype,
		reagent.purification_method = row.purification_method,
		reagent.comments = row.comments,
		reagent.user = "Deepak Purushotham",
		reagent.lab = "undefined",
		reagent.last_updated = 1540434918469

WITH {json} as data
    UNWIND data.file as row
    MERGE (file:file {accession: row.accession})
    SET 
        file.user_accession = row.user_accession,
		file.submission_id = row.submission_id,
		file.pilot = row.pilot,
		file.file_uuid = row.file_uuid,
		file.filename = row.filename,
		file.md5sum = row.md5sum,
		file.format = row.format,
		file.description = row.description,
		file.run_type = row.run_type,
		file.pair = row.pair,
		file.read_length = row.read_length,
		file.platform = row.platform,
		file.instrument = row.instrument,
		file.machine = row.machine,
		file.run_number = row.run_number,
		file.sequencing_lane = row.sequencing_lane,
		file.spike_ins = row.spike_ins,
		file.pcr_cycles = row.pcr_cycles,
		file.insert_size = row.insert_size,
		file.standard_deviation = row.standard_deviation,
		file.barcode = row.barcode,
		file.sequenced_by = row.sequenced_by,
		file.date_sequenced = row.date_sequenced,
		file.comments = row.comments,
		file.user = "Deepak Purushotham",
		file.lab = "undefined",
		file.last_updated = 1540434918470


        WITH {json} as data
        UNWIND data.treatment as row
        
        
        MATCH (treatment:treatment {accession: row.accession})
        WITH row, treatment, 
        CASE  
            WHEN exists(row.challenged_with) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (treatment_challenged_with_diet:diet {accession:row.challenged_with})
                MERGE (treatment)-[:challenged_with]-(treatment_challenged_with_diet)
                )

        WITH {json} as data
        UNWIND data.litter as row
        
        
        MATCH (litter:litter {accession: row.accession})
        WITH row, litter, 
        CASE  
            WHEN exists(row.part_of) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (litter_part_of_bioproject:bioproject {accession:row.part_of})
                MERGE (litter)-[:part_of]-(litter_part_of_bioproject)
                )
                
        
            WITH row
            
        MATCH (litter:litter {accession: row.accession})
        WITH row, litter, 
        CASE  
            WHEN exists(row.sire) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (litter_sire_mouse:mouse {accession:row.sire})
                MERGE (litter)-[:sire]-(litter_sire_mouse)
                )
                
        
            WITH row
            
        MATCH (litter:litter {accession: row.accession})
        WITH row, litter, 
        CASE  
            WHEN exists(row.dam) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (litter_dam_mouse:mouse {accession:row.dam})
                MERGE (litter)-[:dam]-(litter_dam_mouse)
                )
                
        WITH {json} as data
        UNWIND data.mouse as row
        
        
        MATCH (mouse:mouse {accession: row.accession})
        WITH row, mouse, 
        CASE  
            WHEN exists(row.born_to) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (mouse_born_to_litter:litter {accession:row.born_to})
                MERGE (mouse)-[:born_to]-(mouse_born_to_litter)
                )
                
        
            WITH row
            
        MATCH (mouse:mouse {accession: row.accession})
        WITH row, mouse, 
        CASE  
            WHEN exists(row.fed) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (mouse_fed_diet:diet {accession:row.fed})
                MERGE (mouse)-[:fed]-(mouse_fed_diet)
                )
                
        
            WITH row
            
        MATCH (mouse:mouse {accession: row.accession})
        WITH row, mouse, 
        CASE  
            WHEN exists(row.undergoes) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (mouse_undergoes_treatment:treatment {accession:row.undergoes})
                MERGE (mouse)-[:undergoes]-(mouse_undergoes_treatment)
                )
                
        
            WITH row
            
        MATCH (mouse:mouse {accession: row.accession})
        WITH row, mouse, 
        CASE  
            WHEN exists(row.part_of) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (mouse_part_of_bioproject:bioproject {accession:row.part_of})
                MERGE (mouse)-[:part_of]-(mouse_part_of_bioproject)
                )
                

        WITH {json} as data
        UNWIND data.biosample as row
        
        
        MATCH (biosample:biosample {accession: row.accession})
        WITH row, biosample, 
        CASE  
            WHEN exists(row.derived_from) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (biosample_derived_from_mouse:mouse {accession:row.derived_from})
                MERGE (biosample)-[:derived_from]-(biosample_derived_from_mouse)
                )
                
        
            WITH row
            
        MATCH (biosample:biosample {accession: row.accession})
        WITH row, biosample, 
        CASE  
            WHEN exists(row.pooled_from) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (biosample_pooled_from_biosample:biosample {accession:row.pooled_from})
                MERGE (biosample)-[:pooled_from]-(biosample_pooled_from_biosample)
                )
                

        WITH {json} as data
        UNWIND data.assay as row
        
        
        MATCH (assay:assay {accession: row.accession})
        WITH row, assay, 
        CASE  
            WHEN exists(row.recruits) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (assay_recruits_reagent:reagent {accession:row.recruits})
                MERGE (assay)-[:recruits]-(assay_recruits_reagent)
                )
                
        
            WITH row
            
        MATCH (assay:assay {accession: row.accession})
        WITH row, assay, 
        CASE  
            WHEN exists(row.assay_input) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (assay_assay_input_biosample:biosample {accession:row.assay_input})
                MERGE (assay)-[:assay_input]-(assay_assay_input_biosample)
                )
                
        
            WITH row
            
        MATCH (assay:assay {accession: row.accession})
        WITH row, assay, 
        CASE  
            WHEN exists(row.pooled_from) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (assay_pooled_from_assay:assay {accession:row.pooled_from})
                MERGE (assay)-[:pooled_from]-(assay_pooled_from_assay)
                )
                
        

        WITH {json} as data
        UNWIND data.file as row
        
        
        MATCH (file:file {accession: row.accession})
        WITH row, file, 
        CASE  
            WHEN exists(row.paired_file) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (file_paired_file_file:file {accession:row.paired_file})
                MERGE (file)-[:paired_file]-(file_paired_file_file)
                )
                
        
            WITH row
            
        MATCH (file:file {accession: row.accession})
        WITH row, file, 
        CASE  
            WHEN exists(row.sequenced) THEN ['ok'] ELSE [] 
        END as array1
            FOREACH (el1 in array1 | 
                MERGE (file_sequenced_assay:assay {accession:row.sequenced})
                MERGE (file)-[:sequenced]-(file_sequenced_assay)
                )
                