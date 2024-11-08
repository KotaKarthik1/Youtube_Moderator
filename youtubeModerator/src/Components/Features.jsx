import React from "react";

const Features = () => {
  return (
    <div>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 mx-auto md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Key Features of Youtube Moderator
          </h2>

          {/* <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            
          </p> */}
        </div>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 ">
          {/* <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <i className="fas fa-pencil-alt text-3xl"></i>

              <div className="space-y-2">
                <h3 className="font-bold">Account Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Organizers can connect multiple YouTube accounts to the
                  platform for direct video uploads and management.
                </p>
              </div>
            </div>
          </div> */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
  <div className="flex h-[160px] flex-col justify-between items-center rounded-md p-6">
    <i className="fas fa-pencil-alt text-3xl"></i>

    <div className="space-y-2">
      <h3 className="font-bold">Account Integration</h3>
      <p className="text-sm text-muted-foreground">
        Organizers can connect multiple YouTube accounts to the
        platform for direct video uploads and management.
      </p>
    </div>
  </div>
</div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <i className="fas fa-map-marker-alt text-3xl"></i>

              <div className="space-y-2">
                <h3 className="font-bold">Editor Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Organizers can invite multiple video editors with specific
                  permissions to collaborate on video uploads, editing, and
                  management.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <i className="fas fa-wallet text-3xl"></i>
              <div className="space-y-2">
                <h3 className="font-bold">Efficient Video Review</h3>
                <p className="text-sm text-muted-foreground">
                  Editors can upload videos to the platform for review by
                  organizers without the need for downloading large files,
                  saving time and bandwidth.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <i className="fas fa-star text-3xl"></i>
              <div className="space-y-2">
                <h3 className="font-bold">Streamlined Communication</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time notifications and messaging features facilitate
                  communication between organizers and editors, ensuring smooth
                  workflow and quick issue resolution.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[160px] flex-col justify-between rounded-md p-6">
              <i className="fas fa-money-bill-wave text-3xl"></i>
              <div className="space-y-2">
                <h3 className="font-bold">Video Chunks</h3>
                <p className="text-sm text-muted-foreground">
                  The platform stores large videos in chunks, making them easier
                  to upload, download, and stream for review purposes.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <i className="fas fa-money-bill-wave text-3xl"></i>
              <div className="space-y-2">
                <h3 className="font-bold">Publishing Workflow</h3>
                <p className="text-sm text-muted-foreground">
                  Once a video is approved, organizers can provide final
                  details, and editors can directly publish the video to the
                  connected YouTube channel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
