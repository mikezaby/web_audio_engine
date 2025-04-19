export default function Page() {
  return (
    <div className="w-full py-6">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-prose space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Privacy Policy{" "}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Last updated: March 7, 2023
            </p>
          </div>
          <div>
            At Blibliki, accessible from https://www.blibliki.com/, one of our
            main priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by Blibliki and how we use it.
          </div>
          <div className="space-y-4">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Personal Information We Collect
              </h2>

              <p className="text-gray-500 dark:text-gray-400">
                When you visit our site and use our services, we may ask for
                your email address. This is solely to personalize your
                experience and to save your preferences and configurations on
                our site.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  How We Use Your Information The information
                </h2>

                <div className="text-gray-500 dark:text-gray-400">
                  We collect from you may be used to:
                  <ul>
                    <li>
                      Personalize your experience and respond to your individual
                      needs
                    </li>
                    <li>
                      Improve our website based on the feedback you provide
                    </li>
                    <li>
                      Send periodic emails regarding new features or services on
                      our site
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-4">
                  <p className="text-gray-500 dark:text-gray-400">
                    We strictly do not sell, trade, or otherwise transfer to
                    outside parties your Personally Identifiable Information.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Your Consent By using our site, you hereby consent to our
                    Privacy Policy and agree to its Terms and Conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
