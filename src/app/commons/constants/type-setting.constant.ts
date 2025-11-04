export const TYPE_SETTING_CONS = {
  WEB: 'WEB',
  MAIL: 'MAIL',
  ORDER: 'ORDER',
  RESERVATION: 'RESERVATION',
} as const;

export const VALUE_SETTING_CONS = {
  STRING: 'string',
  INTEGER: 'integer',
  DECIMAL: 'decimal',
  HIDDEN: 'hidden',
  OPTIONS: 'options',
  MULTI_OPTIONS: 'multi_options',
  SELECT: 'select',
  MULTI_SELECT: 'multi_select',
  BOOLEAN: 'boolean',
  UPLOAD: 'upload',
} as const;
