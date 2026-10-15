import { Bike, CheckCircle2, ChefHat, Clock } from "lucide-react";
import { ORDER_STAGES, getOrderStageIndex } from "../utils/orderStatus";

const stageIcons = [CheckCircle2, ChefHat, Bike, CheckCircle2];

export default function OrderTrackingModal({
  order,
  trackingError,
  onDismiss,
}) {
  if (!order) return null;

  const currentStage = getOrderStageIndex(order.status);

  return (
    <div className="overlay">
      <section
        className="modal tracking"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tracking-title"
      >
        <div className="success-icon">
          <CheckCircle2 size={30} />
        </div>

        <div className="eyebrow">ORDER CONFIRMED</div>
        <h2 id="tracking-title">It's happening!</h2>

        <p className="muted">
          Order <b>#{String(order._id).slice(-6).toUpperCase()}</b> is on its
          way to becoming delicious.
        </p>

        <div className="timeline">
          {ORDER_STAGES.map((stage, index) => {
            const Icon = stageIcons[index];
            const isComplete = currentStage >= 0 && index <= currentStage;

            return (
              <div className={`stage ${isComplete ? "done" : ""}`} key={stage}>
                <span className="stage-icon">
                  <Icon size={17} />
                </span>

                <div>
                  <b>{stage}</b>
                  <small>
                    {index === currentStage
                      ? "Current status"
                      : index < currentStage
                        ? "Completed"
                        : "Coming up"}
                  </small>
                </div>

                {index === currentStage && <span className="live-dot" />}
              </div>
            );
          })}
        </div>

        {trackingError && (
          <p className="error" role="status">
            {trackingError}
          </p>
        )}

        <div className="tracking-note">
          <Clock size={17} />
          Status refreshes automatically while you wait.
        </div>

        <button className="primary full" onClick={onDismiss}>
          Back to menu
        </button>
      </section>
    </div>
  );
}
