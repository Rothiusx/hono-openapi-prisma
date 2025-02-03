import type { Prisma } from '@prisma/client'

import { z } from 'zod'

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted', 'ReadCommitted', 'RepeatableRead', 'Serializable'])

export const BatchScalarFieldEnumSchema = z.enum(['id_batch', 'id_order', 'batch_key', 'batch_size', 'id_wc_last', 'batch_wc_enter', 'batch_product_itmref', 'batch_product_qty', 'batch_created', 'batch_comment', 'batch_state_num', 'batch_lot'])

export const Build_instructionScalarFieldEnumSchema = z.enum(['id_bi', 'id_wc', 'bi_pn', 'bi_type', 'bi_text'])

export const Concession_assignScalarFieldEnumSchema = z.enum(['id_concession_assign', 'id_concession', 'id_batch', 'id_user', 'concession_date'])

export const Concession_enumScalarFieldEnumSchema = z.enum(['id_concession', 'concession_name', 'concession_desc', 'concession_created', 'concession_closed', 'concession_disabled'])

export const Custom_fieldScalarFieldEnumSchema = z.enum(['id_field', 'id_wc', 'field_name', 'field_desc', 'field_datatype', 'field_order'])

export const Custom_field_instanceScalarFieldEnumSchema = z.enum(['id_field_instance', 'id_field', 'id_order', 'field_value'])

export const DeviceScalarFieldEnumSchema = z.enum(['id_device', 'id_wc', 'device_key', 'device_name', 'device_desc'])

export const Entry_assignScalarFieldEnumSchema = z.enum(['id_entry_assign', 'id_wc', 'id_entry', 'entry_assign_order', 'entry_assign_mandatory'])

export const Entry_enumScalarFieldEnumSchema = z.enum(['id_entry', 'entry_name', 'entry_key', 'entry_desc', 'entry_is_error', 'entry_datatype', 'entry_color', 'entry_icon'])

export const Entry_instanceScalarFieldEnumSchema = z.enum(['id_entry_inst', 'id_entry_assign', 'id_wc_stay', 'id_user', 'entry_value', 'entry_modified', 'entry_inactive', 'entry_finalized'])

export const OperationScalarFieldEnumSchema = z.enum(['id_operation', 'id_wc', 'id_order', 'oper_time', 'oper_name', 'oper_seq'])

export const Permission_assignScalarFieldEnumSchema = z.enum(['id_permission_assign', 'id_role', 'id_permission'])

export const Role_assignScalarFieldEnumSchema = z.enum(['id_role_assign', 'id_user', 'id_role'])

export const Time_trackerScalarFieldEnumSchema = z.enum(['id_time', 'id_wc_stay', 'id_user', 'time_start', 'time_stop', 'time_interval', 'time_type'])

export const User_permissionScalarFieldEnumSchema = z.enum(['id_permission', 'permission_name', 'permission_desc'])

export const User_roleScalarFieldEnumSchema = z.enum(['id_role', 'role_name', 'role_desc'])

export const User_userScalarFieldEnumSchema = z.enum(['id_user', 'user_firstname', 'user_lastname', 'user_login', 'user_ldap', 'user_pass', 'user_operator', 'user_inactive', 'user_token'])

export const Work_centerScalarFieldEnumSchema = z.enum(['id_wc', 'wc_desc', 'wc_week_hours', 'wc_idle_timeout'])

export const Work_center_stayScalarFieldEnumSchema = z.enum(['id_wc_stay', 'id_wc', 'id_batch', 'id_user', 'wc_start_date', 'wc_end_date', 'wc_stay_order', 'wc_stay_last_stay_on_wc', 'wc_stay_finish_qty'])

export const Work_orderScalarFieldEnumSchema = z.enum(['id_order', 'wo_number', 'wo_startdate', 'wo_enddate', 'wo_product', 'wo_quantity', 'wo_status', 'wo_x3_last_update', 'wo_comment', 'wo_note_short', 'wo_note_long', 'wo_hold', 'wo_keep_ope_seq', 'wo_customer'])

export const SortOrderSchema = z.enum(['asc', 'desc'])

export const NullsOrderSchema = z.enum(['first', 'last'])

export const batchOrderByRelevanceFieldEnumSchema = z.enum(['batch_key', 'id_wc_last', 'batch_product_itmref', 'batch_comment', 'batch_lot'])

export const build_instructionOrderByRelevanceFieldEnumSchema = z.enum(['id_wc', 'bi_pn', 'bi_type', 'bi_text'])

export const concession_enumOrderByRelevanceFieldEnumSchema = z.enum(['concession_name', 'concession_desc'])

export const custom_fieldOrderByRelevanceFieldEnumSchema = z.enum(['id_wc', 'field_name', 'field_desc', 'field_datatype'])

export const custom_field_instanceOrderByRelevanceFieldEnumSchema = z.enum(['field_value'])

export const deviceOrderByRelevanceFieldEnumSchema = z.enum(['id_wc', 'device_key', 'device_name', 'device_desc'])

export const entry_assignOrderByRelevanceFieldEnumSchema = z.enum(['id_wc'])

export const entry_enumOrderByRelevanceFieldEnumSchema = z.enum(['entry_name', 'entry_key', 'entry_desc', 'entry_datatype', 'entry_color', 'entry_icon'])

export const entry_instanceOrderByRelevanceFieldEnumSchema = z.enum(['entry_value'])

export const operationOrderByRelevanceFieldEnumSchema = z.enum(['id_wc', 'oper_name'])

export const user_permissionOrderByRelevanceFieldEnumSchema = z.enum(['permission_name', 'permission_desc'])

export const user_roleOrderByRelevanceFieldEnumSchema = z.enum(['role_name', 'role_desc'])

export const user_userOrderByRelevanceFieldEnumSchema = z.enum(['user_firstname', 'user_lastname', 'user_login', 'user_pass', 'user_operator', 'user_token'])

export const work_centerOrderByRelevanceFieldEnumSchema = z.enum(['id_wc', 'wc_desc'])

export const work_center_stayOrderByRelevanceFieldEnumSchema = z.enum(['id_wc'])

export const work_orderOrderByRelevanceFieldEnumSchema = z.enum(['wo_number', 'wo_startdate', 'wo_enddate', 'wo_product', 'wo_comment', 'wo_note_short', 'wo_note_long', 'wo_customer'])

export const WorkCenterSchema = z.enum(['CZ_CNC', 'CZ_PRODP', 'CZ_PRODL'])

export type WorkCenterType = `${z.infer<typeof WorkCenterSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// BATCH SCHEMA
/////////////////////////////////////////

/**
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export const batchSchema = z.object({
  id_batch: z.number(),
  id_order: z.number(),
  batch_key: z.string(),
  batch_size: z.number(),
  id_wc_last: z.string().nullable(),
  batch_wc_enter: z.coerce.date().nullable(),
  batch_product_itmref: z.string().nullable(),
  batch_product_qty: z.number().nullable(),
  batch_created: z.coerce.date().nullable(),
  batch_comment: z.string().nullable(),
  batch_state_num: z.number().nullable(),
  batch_lot: z.string().nullable(),
})

export type batch = z.infer<typeof batchSchema>

/////////////////////////////////////////
// BUILD INSTRUCTION SCHEMA
/////////////////////////////////////////

export const build_instructionSchema = z.object({
  id_bi: z.number(),
  id_wc: z.string().nullable(),
  bi_pn: z.string().nullable(),
  bi_type: z.string(),
  bi_text: z.string(),
})

export type build_instruction = z.infer<typeof build_instructionSchema>

/////////////////////////////////////////
// CONCESSION ASSIGN SCHEMA
/////////////////////////////////////////

export const concession_assignSchema = z.object({
  id_concession_assign: z.number(),
  id_concession: z.number(),
  id_batch: z.number(),
  id_user: z.number(),
  concession_date: z.coerce.date(),
})

export type concession_assign = z.infer<typeof concession_assignSchema>

/////////////////////////////////////////
// CONCESSION ENUM SCHEMA
/////////////////////////////////////////

export const concession_enumSchema = z.object({
  id_concession: z.number(),
  concession_name: z.string(),
  concession_desc: z.string(),
  concession_created: z.coerce.date(),
  concession_closed: z.coerce.date().nullable(),
  concession_disabled: z.boolean().nullable(),
})

export type concession_enum = z.infer<typeof concession_enumSchema>

/////////////////////////////////////////
// CUSTOM FIELD SCHEMA
/////////////////////////////////////////

export const custom_fieldSchema = z.object({
  id_field: z.number(),
  id_wc: z.string().nullable(),
  field_name: z.string(),
  field_desc: z.string(),
  field_datatype: z.string(),
  field_order: z.number().nullable(),
})

export type custom_field = z.infer<typeof custom_fieldSchema>

/////////////////////////////////////////
// CUSTOM FIELD INSTANCE SCHEMA
/////////////////////////////////////////

export const custom_field_instanceSchema = z.object({
  id_field_instance: z.number(),
  id_field: z.number(),
  id_order: z.number(),
  field_value: z.string().nullable(),
})

export type custom_field_instance = z.infer<typeof custom_field_instanceSchema>

/////////////////////////////////////////
// DEVICE SCHEMA
/////////////////////////////////////////

export const deviceSchema = z.object({
  id_device: z.number(),
  id_wc: z.string().nullable(),
  device_key: z.string().nullable(),
  device_name: z.string(),
  device_desc: z.string(),
})

export type device = z.infer<typeof deviceSchema>

/////////////////////////////////////////
// ENTRY ASSIGN SCHEMA
/////////////////////////////////////////

export const entry_assignSchema = z.object({
  id_entry_assign: z.number(),
  id_wc: z.string(),
  id_entry: z.number(),
  entry_assign_order: z.number().nullable(),
  entry_assign_mandatory: z.boolean(),
})

export type entry_assign = z.infer<typeof entry_assignSchema>

/////////////////////////////////////////
// ENTRY ENUM SCHEMA
/////////////////////////////////////////

export const entry_enumSchema = z.object({
  id_entry: z.number(),
  entry_name: z.string(),
  entry_key: z.string().nullable(),
  entry_desc: z.string(),
  entry_is_error: z.boolean(),
  entry_datatype: z.string(),
  entry_color: z.string().nullable(),
  entry_icon: z.string().nullable(),
})

export type entry_enum = z.infer<typeof entry_enumSchema>

/////////////////////////////////////////
// ENTRY INSTANCE SCHEMA
/////////////////////////////////////////

export const entry_instanceSchema = z.object({
  id_entry_inst: z.number(),
  id_entry_assign: z.number(),
  id_wc_stay: z.number(),
  id_user: z.number(),
  entry_value: z.string().nullable(),
  entry_modified: z.coerce.date().nullable(),
  entry_inactive: z.boolean(),
  entry_finalized: z.boolean(),
})

export type entry_instance = z.infer<typeof entry_instanceSchema>

/////////////////////////////////////////
// OPERATION SCHEMA
/////////////////////////////////////////

export const operationSchema = z.object({
  id_operation: z.number(),
  id_wc: z.string(),
  id_order: z.number(),
  oper_time: z.number(),
  oper_name: z.string().nullable(),
  oper_seq: z.number(),
})

export type operation = z.infer<typeof operationSchema>

/////////////////////////////////////////
// PERMISSION ASSIGN SCHEMA
/////////////////////////////////////////

export const permission_assignSchema = z.object({
  id_permission_assign: z.number(),
  id_role: z.number(),
  id_permission: z.number(),
})

export type permission_assign = z.infer<typeof permission_assignSchema>

/////////////////////////////////////////
// ROLE ASSIGN SCHEMA
/////////////////////////////////////////

export const role_assignSchema = z.object({
  id_role_assign: z.number(),
  id_user: z.number(),
  id_role: z.number(),
})

export type role_assign = z.infer<typeof role_assignSchema>

/////////////////////////////////////////
// TIME TRACKER SCHEMA
/////////////////////////////////////////

export const time_trackerSchema = z.object({
  id_time: z.number(),
  id_wc_stay: z.number(),
  id_user: z.number().nullable(),
  time_start: z.coerce.date().nullable(),
  time_stop: z.coerce.date().nullable(),
  time_interval: z.number().nullable(),
  time_type: z.number(),
})

export type time_tracker = z.infer<typeof time_trackerSchema>

/////////////////////////////////////////
// USER PERMISSION SCHEMA
/////////////////////////////////////////

export const user_permissionSchema = z.object({
  id_permission: z.number(),
  permission_name: z.string(),
  permission_desc: z.string(),
})

export type user_permission = z.infer<typeof user_permissionSchema>

/////////////////////////////////////////
// USER ROLE SCHEMA
/////////////////////////////////////////

export const user_roleSchema = z.object({
  id_role: z.number(),
  role_name: z.string(),
  role_desc: z.string(),
})

export type user_role = z.infer<typeof user_roleSchema>

/////////////////////////////////////////
// USER USER SCHEMA
/////////////////////////////////////////

export const user_userSchema = z.object({
  id_user: z.number(),
  user_firstname: z.string(),
  user_lastname: z.string(),
  user_login: z.string().nullable(),
  user_ldap: z.boolean(),
  user_pass: z.string().nullable(),
  user_operator: z.string().nullable(),
  user_inactive: z.boolean(),
  user_token: z.string().nullable(),
})

export type user_user = z.infer<typeof user_userSchema>

/////////////////////////////////////////
// WORK CENTER SCHEMA
/////////////////////////////////////////

export const work_centerSchema = z.object({
  id_wc: z.string(),
  wc_desc: z.string(),
  wc_week_hours: z.number(),
  wc_idle_timeout: z.number(),
})

export type work_center = z.infer<typeof work_centerSchema>

/////////////////////////////////////////
// WORK CENTER STAY SCHEMA
/////////////////////////////////////////

/**
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export const work_center_staySchema = z.object({
  id_wc_stay: z.number(),
  id_wc: z.string(),
  id_batch: z.number(),
  id_user: z.number().nullable(),
  wc_start_date: z.coerce.date(),
  wc_end_date: z.coerce.date().nullable(),
  wc_stay_order: z.number(),
  wc_stay_last_stay_on_wc: z.boolean().nullable(),
  wc_stay_finish_qty: z.number(),
})

export type work_center_stay = z.infer<typeof work_center_staySchema>

/////////////////////////////////////////
// WORK ORDER SCHEMA
/////////////////////////////////////////

export const work_orderSchema = z.object({
  id_order: z.number(),
  wo_number: z.string(),
  wo_startdate: z.string().nullable(),
  wo_enddate: z.string().nullable(),
  wo_product: z.string().nullable(),
  wo_quantity: z.number().nullable(),
  wo_status: z.number().nullable(),
  wo_x3_last_update: z.coerce.date().nullable(),
  wo_comment: z.string().nullable(),
  wo_note_short: z.string().nullable(),
  wo_note_long: z.string().nullable(),
  wo_hold: z.boolean(),
  wo_keep_ope_seq: z.boolean(),
  wo_customer: z.string().nullable(),
})

export type work_order = z.infer<typeof work_orderSchema>
