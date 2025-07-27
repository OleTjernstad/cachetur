import { formOpts } from './options'
import { withForm } from '@/components/form/form-context'

export const StepOne = withForm({
  // These values are only used for type-checking, and are not used at runtime
  // This allows you to `...formOpts` from `formOptions` without needing to redeclare the options
  ...formOpts,
  // Optional, but adds props to the `render` function in addition to `form`
  props: {},
  render: function Render({ form }) {
    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">
            Information and username selection
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Please provide your basic information
          </p>
        </div>

        <form.AppField
          name="username"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Username is required' : undefined,
          }}
          children={(field) => (
            <field.TextField label="Username" placeholder="Choose a username" />
          )}
        />

        <form.AppField
          name="referral"
          validators={{
            onChange: ({ value }) =>
              !value
                ? 'Please select how you heard about cachetur.no'
                : undefined,
          }}
          children={(field) => (
            <field.SelectField
              label="How did you hear about cachetur.no?"
              placeholder="Choose an option"
              items={[
                { value: 'En annen geocacher', label: 'Another geocacher' },
                { value: 'En ambassadør', label: 'A cachetur.no ambassador' },
                { value: 'Geocaching.com', label: 'Geocaching.com' },
                { value: 'PodCacher', label: 'PodCacher' },
                { value: 'GeoGearHeads', label: 'GeoGearHeads' },
                { value: 'GeocacheTalk', label: 'GeocacheTalk' },
                {
                  value: 'Caching in the Northwest',
                  label: 'Caching in the Northwest',
                },
                { value: 'En annen podcast', label: 'Another podcast' },
                {
                  value: 'På et event/megaevent',
                  label: 'At an event/mega event',
                },
                {
                  value: 'Fant en flyer/visittkort i en cache',
                  label: 'Found a flyer/card in a geocache',
                },
                {
                  value: 'Google eller lignende',
                  label: 'Google or another search engine',
                },
                { value: 'I en logg på en cache', label: 'In a geocache log' },
                { value: 'Facebook', label: 'Facebook' },
                { value: 'Gcinfo.no', label: 'Gcinfo.no' },
                {
                  value: 'Fra en annen forening',
                  label: 'From another organization',
                },
                { value: 'Fra en annonse', label: 'From an advertisement' },
                { value: 'Annet', label: 'Other' },
              ]}
            />
          )}
        />
      </div>
    )
  },
})
