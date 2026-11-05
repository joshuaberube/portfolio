<div class="sky" aria-hidden="true">
  <span class="cloud cloud-one"></span>
  <span class="cloud cloud-two"></span>
  <span class="cloud cloud-three"></span>
</div>

<style>
  .sky {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    background: linear-gradient(180deg, #74c9ff 0%, #b9e6ff 58%, #e6f8ff 100%);
  }

  .cloud {
    position: absolute;
    width: var(--cloud-width);
    height: var(--cloud-height);
    border-radius: 999px;
    background: rgb(255 255 255);
    box-shadow: 0 8px 18px rgb(54 135 183 / 12%);
  }

  .cloud::before,
  .cloud::after {
    position: absolute;
    bottom: 0;
    content: '';
    border-radius: 50%;
    background: inherit;
  }

  .cloud::before {
    left: var(--small-puff-left);
    width: var(--small-puff-size);
    height: var(--small-puff-size);
  }

  .cloud::after {
    right: var(--large-puff-right);
    width: var(--large-puff-size);
    height: var(--large-puff-size);
  }

  .cloud-one {
    --cloud-width: 108px;
    --cloud-height: 30px;
    --small-puff-left: 13px;
    --small-puff-size: 49px;
    --large-puff-right: 12px;
    --large-puff-size: 62px;
    top: 13%;
    left: 7%;
    animation: drift 22s ease-in-out infinite alternate;
  }

  .cloud-two {
    --cloud-width: 158px;
    --cloud-height: 44px;
    --small-puff-left: 19px;
    --small-puff-size: 71px;
    --large-puff-right: 17px;
    --large-puff-size: 90px;
    top: 29%;
    right: 8%;
    animation: drift 28s ease-in-out infinite alternate-reverse;
  }

  .cloud-three {
    --cloud-width: 83px;
    --cloud-height: 23px;
    --small-puff-left: 10px;
    --small-puff-size: 37px;
    --large-puff-right: 9px;
    --large-puff-size: 47px;
    top: 59%;
    left: 25%;
    animation: drift 24s ease-in-out infinite alternate;
  }

  @keyframes drift {
    to {
      translate: 28px 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cloud {
      animation: none;
    }
  }

  /* On touch devices, static clouds avoid an always-on ambient animation. */
  @media (pointer: coarse) {
    .cloud {
      animation: none;
    }
  }
</style>
